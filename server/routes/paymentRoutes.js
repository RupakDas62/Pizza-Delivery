const express = require("express");
const router = express.Router();
const { createPaymentOrder } = require("../controllers/paymentController");
const { protect } = require("../middlewares/authMiddleware"); // if user auth is needed

router.post("/create", protect, createPaymentOrder);

module.exports = router;
