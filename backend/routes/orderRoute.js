const express  = require("express");
const router = express.Router();
const { isAuthentication,authorizeroles } = require("../middleware/authentication");
const { newOrder, getSingleOrder, myOrder, getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/OrderController");

router.route("/order/new").post( isAuthentication, newOrder);
router.route("/order/:id").get( isAuthentication, getSingleOrder);
router.route("/orders/me").get( isAuthentication, myOrder);
router.route("/admin/orders").get(isAuthentication,authorizeroles("admin"), getAllOrders);
router.route("/admin/order/:id").put(isAuthentication,authorizeroles("admin"), updateOrderStatus).delete(isAuthentication,authorizeroles("admin"), deleteOrder);


module.exports = router;