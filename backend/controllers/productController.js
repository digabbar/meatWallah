const Product = require("../models/product");

// Create new Product => /api/v1/products/new
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};
// get all the products => /api/v1/products
exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    count: products.length,
    ...products,
  });
};
// get single products=> /api/v1/products/:id

exports.getSingleProduct = async (req, res, next) => {
  const { id } = req.params;
  const singleProduct = await Product.findById(id);
  res.status(200).json({
    success: true,
    singleProduct,
  });
};

// update single product => /api/v1/products/:id/update

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    updatedProduct,
  });
};

// delete Single Product => /api/v1/products/:id

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const deleteProduct = await Product.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    deleteProduct,
  });
};
