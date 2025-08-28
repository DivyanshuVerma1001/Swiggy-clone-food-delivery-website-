const express= require('express')
const {register,verifyOtp}= require('../controller/userAuth')
const authRouter= express.Router()

authRouter.post('/register',register);
authRouter.post('/otpverification',verifyOtp)
module.exports= authRouter;