const express= require("express");
const { createOrder, verifyPayment, codPayment } = require("../controller/payment");
const userMiddleware = require("../middleware/userMiddleware");
const paymentRouter= express.Router()

paymentRouter.post('/createOrder',userMiddleware,createOrder);
paymentRouter.post('/verifyPayment',userMiddleware,verifyPayment);
paymentRouter.post('/cod',userMiddleware ,codPayment)
module.exports= paymentRouter;