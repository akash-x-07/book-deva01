// server.js
const express = require("express");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET
});

// 🔹 Create Order API
app.post("/create-order", async (req, res) => {
  const { amount, currency = "INR" } = req.body;

  const options = {
    amount: amount, 
    currency,
    receipt: "rcpt_" + Date.now(),
    payment_capture: 1
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to create order" });
  }
});


app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RZP_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // Verified ✅
    // Future me: save to database
    res.json({ status: "success", message: "Payment verified successfully!" });
  } else {
    res.status(400).json({ status: "failed", message: "Invalid signature" });
  }
});

// 🔹 Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
