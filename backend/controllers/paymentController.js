const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const crypto = require("crypto");
const Razorpay = require("razorpay");

exports.checkout = catchAsyncErrors(async (req, res, next) => {
  const instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET,
  });
  const options = {
    amount: req.body.amount, // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance.orders.create(options, function (err, order) {
    if (err) {
      return next(new ErrorHandler("order created failed", 400));
    }
    res.status(200).json({
      success: true,
      order,
    });
  });
});
exports.paymentVerification = catchAsyncErrors(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZOR_PAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    res.status(200).json({
      payment: {
        payment_id: razorpay_payment_id,
        razorpay_orderId: razorpay_order_id,
        paymentStatus: "Success",
      },
    });
  } else {
    res.status(200).json({
      payment_id: razorpay_payment_id,
      razorpay_orderId: razorpay_order_id,
      paymentStatus: "Processing",
    });
  }
});

exports.getrazorkey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    key: process.env.RAZOR_PAY_KEY_ID,
  });
});
