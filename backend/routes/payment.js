const express = require("express");
const router = express.Router();

const {
  checkout,
  paymentVerification,
  getrazorkey,
} = require("../controllers/paymentController");

const { isAuthenticatatedUser } = require("../middlewares/auth");

router.route("/payment/checkout").post(isAuthenticatatedUser, checkout);
router.route("/payment/verification").post(paymentVerification);

router.route("/getkey").get(isAuthenticatatedUser, getrazorkey);

module.exports = router;
