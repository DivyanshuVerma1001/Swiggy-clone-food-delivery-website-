const express= require('express')
const {register,verifyOtp,login ,forgotPassword,resetPassword}= require('../controller/userAuth')
const userMiddleware= require('../middleware/userMiddleware');
const {googleLogin, googleRegister} = require('../controller/userGoogleAuth');
const authRouter= express.Router()

authRouter.post('/register',register);
authRouter.post('/otpverification',verifyOtp)
authRouter.post('/login',login)
authRouter.post('/forgotPassword',forgotPassword)
authRouter.post('/resetPassword/:token',resetPassword)
authRouter.get('/googleLogin',googleLogin)
authRouter.get('/googleRegister',googleRegister)
authRouter.get('/check',userMiddleware,(req,res)=>{
    const reply= {
        name:req.result.name,

        emailId:req.result.email,
        _id:req.result._id
    }
    res.status(200).json({
        user:reply,
        message:"valid user"
    })
})
module.exports= authRouter;