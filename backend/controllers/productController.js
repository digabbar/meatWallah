const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
// Create new Product => /api/v1/admin/products/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
// get all the products => /api/v1/products?keyword=egg
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Product, req.query).search().filter();

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
