const express= require("express");
const { createOrder, verifyPayment } = require("../controller/payment");
const paymentRouter= express.Router()

paymentRouter.post('/createOrder',createOrder);
paymentRouter.post('/verifyPayment',verifyPayment);

module.exports= paymentRouter;