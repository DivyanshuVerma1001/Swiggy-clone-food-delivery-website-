const express= require("express");
const { createOrder, verifyPayment, codPayment } = require("../controller/payment");
const paymentRouter= express.Router()

paymentRouter.post('/createOrder',createOrder);
paymentRouter.post('/verifyPayment',verifyPayment);
paymentRouter.post('/cod',codPayment)
module.exports= paymentRouter;