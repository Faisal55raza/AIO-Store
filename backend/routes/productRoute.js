const express = require("express");
const { getALLProducts,createProduct,updateProduct,deleteProduct,getProductDetails, createProductReview, getAllReview, deleteReview, getAdminProducts } = require("../controllers/productController");
const { isAuthentication,authorizeroles } = require("../middleware/authentication");

const router = express.Router();


router.route("/products").get(getALLProducts);
router.route("/admin/products").get(isAuthentication, authorizeroles("admin") ,getAdminProducts);
router.route("/admin/product/new").post(isAuthentication , authorizeroles("admin"), createProduct);
router.route("/admin/product/:id").put(isAuthentication , authorizeroles("admin"), updateProduct)
                                  .delete(isAuthentication , authorizeroles("admin"), deleteProduct)
                                  .get(getProductDetails);
router.route("/review").put(isAuthentication, createProductReview );
router.route("/reviews").get(getAllReview)
                        .delete(isAuthentication,deleteReview);
module.exports = router