const express  = require("express");
const router = express.Router();
const { isAuthentication } = require("../middleware/authentication");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");

router.route("/payment/process").post(processPayment);
router.route("/stripeapikey").get(sendStripeApiKey);

module.exports = router;