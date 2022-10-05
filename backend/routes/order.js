const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const {
  isAuthenticatatedUser,
  authorizeRoles,
} = require("../middlewares/auth");
router.route("/orders/new").post(isAuthenticatatedUser, newOrder);
router.route("/orders/me").get(isAuthenticatatedUser, myOrders);
router
  .route("/orders/:id")
  .get(isAuthenticatatedUser, authorizeRoles("admin"), getSingleOrder);
router
  .route("/admin/orders")
  .get(isAuthenticatatedUser, authorizeRoles("admin"), allOrders);

router
  .route("/admin/orders/:id")
  .put(isAuthenticatatedUser, authorizeRoles("admin"), updateOrder);
router
  .route("/admin/orders/:id")
  .delete(isAuthenticatatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
