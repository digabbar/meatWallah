const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// Create new Product => /api/v1/admin/products/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    console.log("jha");

    images = req.body.images;
  }

  let imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader
      .upload(images[i], {
        folder: "products",
      })
      .then((result) => {
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user._id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
  });
});
// get all the products => /api/v1/products?keyword=egg
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 6;
  const productCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;
  apiFeatures.pagination(resPerPage);
  products = await apiFeatures.query.clone();
  setTimeout(() => {
    res.status(200).json({
      success: true,
      count: productCount,
      products,
      resPerPage,
      filteredProductsCount,
    });
  }, 1000);
});
// get single products=> /api/v1/products/:id

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const singleProduct = await Product.findById(id);
  if (!singleProduct) {
    return next(new ErrorHandler("Product not found", 404));
  }
  setTimeout(() => {
    res.status(200).json({
      success: true,
      singleProduct,
    });
  }, 1000);
});

// update single product => /api/v1/admin/products/:id/update

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// delete Single Product => /api/v1/admin/products/:id

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  for (let i = 0; i < product.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }
  await product.remove();

  res.status(200).json({
    success: true,
  });
});

// create new review => /api/v1/products/:id/review/new
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(req.params.id);
  const isUserBuyProduct = product.purchasedUser.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (!isUserBuyProduct) {
    return next(new ErrorHandler("first buy this product", 400));
  }
  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  await product.save();
  res.status(200).json({
    success: true,
  });
});

// get product reviews ==> /api/v1/products/:id/review
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete product reviews ===> /api/v1/product/:id/review/:reviewId
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  const reviews = product.reviews.filter(
    (r) => r._id.toString() !== req.params.reviewId.toString()
  );

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.params.id,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
    }
  );
  await product.save();
  res.status(200).json({
    success: true,
    product,
  });
});
