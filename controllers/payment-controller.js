const Razorpay = require("razorpay")

// Create Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
})

// Create an order
exports.createOrder = async (req, res, next) => {
  const { amount } = req.body

  try {
    const options = {
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    }
    const order = await razorpay.orders.create(options)
    res.status(201).json({
      success: true,
      order,
    })
  } catch (error) {
    next(error) // Pass error to middleware
  }
}

// Verify payment
exports.verifyPayment = (req, res, next) => {
  const crypto = require("crypto")
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body

  try {
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpayOrderId + "|" + razorpayPaymentId)
      .digest("hex")

    if (generated_signature === razorpaySignature) {
      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      })
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      })
    }
  } catch (error) {
    next(error) // Pass error to middleware
  }
}
