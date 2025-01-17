const express = require("express")
const { verifyPayment,createOrder } = require("../controllers/payment-controller")

const router = express.Router()

router.post("/create-order", createOrder)
router.post("/verify-payment", verifyPayment)

module.exports = router
