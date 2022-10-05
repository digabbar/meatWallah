const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} = require("../controllers/productController");

const {
  isAuthenticatatedUser,
  authorizeRoles,
} = require("../middlewares/auth");

router.route("/products").get(getProducts);
router.route("/products/:id").get(getSingleProduct);

router
  .route("/admin/products/new")
  .post(isAuthenticatatedUser, authorizeRoles("admin"), newProduct);

router
  .route("/admin/products/:id")
  .put(isAuthenticatatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatatedUser, authorizeRoles("admin"), deleteProduct);

router
  .route("/products/:id/review/new")
  .post(isAuthenticatatedUser, createProductReview);
module.exports = router;
