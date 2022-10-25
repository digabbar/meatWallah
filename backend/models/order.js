const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  shippingInfo: {
    firstName: {
      type: String,
      required: [true, "please enter First Name"],
    },
    lastName: {
      type: String,
      required: [true, "please enter Last Name"],
    },
    address: {
      type: String,
      required: [true, "please enter address"],
    },

    city: {
      type: String,
      required: [true, "please enter City Name"],
    },
    phoneNo: {
      type: Number,
      required: [true, "please enter Mobile Number"],
    },
    pincode: {
      type: Number,
      required: [true, "please enter Pincode"],
    },
    country: {
      type: String,
      default: "India",
    },
    state: {
      type: String,
      required: [true, "please enter State"],
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],
  payment: {
    payment_id: {
      type: String,
      required: true,
    },
    razorpay_orderId: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  paidAt: {
    type: Date,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  deliveredAt: {
    type: Date,
  },
});
module.exports = mongoose.model("Order", orderSchema);
