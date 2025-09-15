const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");

// -------------------------
// OTP endpoints
// -------------------------
router.post("/send-otp", checkoutController.sendOtp);        // send OTP
router.post("/verify-otp", checkoutController.verifyOtp);    // verify OTP

// -------------------------
// Stripe checkout endpoints
// -------------------------
router.post("/create-checkout-session", checkoutController.createCheckoutSession);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }), // Stripe requires raw body
  checkoutController.stripeWebhook
);

router.get("/order-success", checkoutController.getOrderSuccess);

module.exports = router;
