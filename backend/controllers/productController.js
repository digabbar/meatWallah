const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const { findById } = require("../models/product");
// Create new Product => /api/v1/admin/products/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
// get all the products => /api/v1/products?keyword=egg
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 2;
  const productCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product, req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    ...products,
  });
});
// get single products=> /api/v1/products/:id

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const singleProduct = await Product.findById(id);
  if (!singleProduct) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    singleProduct,
  });
});

// update single product => /api/v1/admin/products/:id/update

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedProduct) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    updatedProduct,
  });
});

// delete Single Product => /api/v1/admin/products/:id

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    deletedProduct,
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
    return next(new ErrorHandler("user have not buy this product", 400));
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
  await product.save({ validateBeforeSave: false });
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
