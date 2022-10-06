const Order = require("../models/order");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendEmail = require("../utils/sendEmail");
const product = require("../models/product");
const req = require("express/lib/request");
// create new order  => /api/v1/order/new

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    latitude,
    longitude,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    latitude,
    longitude,
    paidAt: Date.now(),
    user: req.user._id,
  });

  const orderDetail = `${req.protocol}://${req.get("host")}/api/v1/orders/me`;
  const message = `your order is on the Way: \n\n check your order details: ${orderDetail} \n\n Total Price :- ${order.totalPrice}`;
  await sendEmail({
    email: req.user.email,
    subject: "meatWallah Order Confirmation",
    message,
  });
  res.status(200).json({
    success: true,
    order,
  });
});
// get single order => /api/v1/orders/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate({
      path: "orderItems.product",
      select: "name price",
    });
  if (!order) {
    return next(new ErrorHandler("No order found with this id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// get single order => /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id }).populate({
    path: "orderItems.product",
    select: "name price",
  });

  res.status(200).json({
    success: true,
    order,
  });
});
// get single order => /api/v1/admin/orders

exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({})
    .populate({
      path: "orderItems.product",
      select: "name price",
    })
    .populate("user", "name email");
  let totalAmount = 0;
  order.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    order,
    totalAmount,
  });
});

// update order => /api/v1/admin/orders/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus === "delivered") {
    return next(new ErrorHandler("you have already delivered this order", 400));
  }
  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity, order.user);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();
  await order.save();
  res.status(200).json({
    success: true,
    order,
  });
});
async function updateStock(id, quantity, userID) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  const alreadyAddedUser = product.purchasedUser.find(
    (idx) => idx.user.toString() === userID.toString()
  );
  if (!alreadyAddedUser) {
    product.purchasedUser.push({ user: userID });
  }
  await product.save();
}

// delete order => /api/v1/admin/orders/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return new ErrorHandler("order not found", 404);
  }
  order.remove();
  res.status(200).json({
    success: true,
    messagae: "deleted",
  });
});
