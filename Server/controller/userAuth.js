    const User= require("../model/user")
    const jwt = require('jsonwebtoken')
    const bcrypt = require("bcrypt");
    const generateVerificationCode= require("../utils/verificationCodeGenerator")
    const generateEmailTemplate= require("../utils/emailTemplate")
    const  twilio = require("twilio");

    const sendEmail= require('../utils/sendEmail')
    
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

    const register=async (req,res)=>{
        console.log("register is called ")
        try{
            console.log("req.body",req.body)
            let {name,email,password,phone,verificationMethod}= req.body;
            console.log("name",name)
            password = await bcrypt.hash(password,10);
            // checking for existing user 
            const existingUser= await User.findOne({
                $or:[
                    {
                        email,
                        accountVerified:true,
                    },
                    {
                        phone,
                        accountVerified:true,
                    }
                ]
            })
            if (existingUser){
                throw new Error("User already exists")
            }
            const user = await User.findOne({
                $or: [
                    { phone, accountVerified: false },
                    { email, accountVerified: false },
                ],
            });
            console.log("completed  till this ")
            if (user && user.accountVerification.length > 3) {
                throw new Error("You have exceeded the maximum number of attempts (3). Please try again after an hour.");
            }
            const userData = {
                name,email,phone ,password,
                accountVerified:false
            }
            let verificationObj={};
            console.log(user);
            if (!user){
                // genrate code 
                const verificationCode= generateVerificationCode();
                verificationObj.verificationMethod= verificationMethod;
                verificationObj.verificationCode = verificationCode;
                userData.accountVerification= [verificationObj];
                const userInfo= await User.create(userData);
                console.log("checking verificaton method", verificationMethod)
                console.log("user name :", userInfo.name)
                sendVerificationCode(  verificationMethod,  verificationCode,  userInfo.name,  userInfo.email,  userInfo.phone,  res)
        }
            else if (user.accountVerification.length<=3){
                const verificationCode= generateVerificationCode();
                verificationObj.verificationMethod= verificationMethod;
                verificationObj.verificationCode = verificationCode;

                user.accountVerification= [verificationObj,...user.accountVerification];
                const userInfo =await user.save();
                console.log("checking verificaton method", verificationMethod)
                                console.log("user name :", userInfo.name)

                sendVerificationCode(  verificationMethod,  verificationCode,  userInfo.name,  userInfo.email,  userInfo.phone,  res)
            }
        
            
        }
        catch(err){
        return res.status(400).json({ error: err.message });
        }
    }
    const verifyOtp = async (req,res)=>{
        const { email, otp, phone } = req.body;
        try{
            const userCheck= await User.findOne({
                accountVerified:true,
                 $or: [
                      { email },
                      { phone }]
                      })
            console.log(userCheck);
            if (userCheck ){
                throw new Error("user already verified");
            }
            const userData= await User.findOne({
                accountVerified:false,
                 $or: [
                      { email },
                      { phone }]
                      })
            console.log(userData)
            if (!userData){
            throw new Error("User not found")
             }
             let user ;
             if (userData.accountVerification.length>1){
                console.log("userData",userData)
                 user = userData.accountVerification[0]; 
                 userData.accountVerification=[user];
             }
             else if (userData.accountVerification.length==1) {
                 console.log("userData2",userData)
                 user = userData.accountVerification[0];

            }
            else if (userData.accountVerification.length==0){
                throw new Error("verification code not found")
            }
            console.log(user);
             if (user.verificationCode != Number(otp)){
                  throw new Error("invaild otp ")
        }
        console.log("otp verification done ")
        const currentTime= Date.now()
        const verificationCodeExpire= new Date(userData.accountVerification.verificationCodeExpire).getTime()
        if (currentTime > verificationCodeExpire) {
        throw new Error("OTP Expired.");
        }
        userData.accountVerified= true;
        userData.accountVerification=[];

        await userData.save();
        const token = jwt.sign({_id:userData._id, emailId:userData.email},"asffds",{expiresIn:3600});
        res.cookie('token',token,{maxAge:60*60*1000});
        const reply={
            name:userData.name,
            emailId:userData.email,
            _id:userData._id
        }
        res.status(201).json({
            user:reply,
            message:"otp is verified !" 
        })
        
        }
        catch(err){
            res.status(401).send("Error: "+err);
        }

    }

    
async function sendVerificationCode(  verificationMethod,  verificationCode,  name,  email,  phone,  res) {
  try {
    console.log("this is user name ", name)
    console.log("sending verification code ",verificationMethod , verificationCode , name , email , phone )
    console.log(verificationMethod)
    if (verificationMethod === "email") {
      const message = generateEmailTemplate(verificationCode);
      // console.log(message)
      sendEmail({ email, subject: "Your Verification Code", message });
      res.status(200).json({
        success: true,
        message: `Verification email successfully sent to ${name}`,
      });
      console.log("messasge send ")
    } else if (verificationMethod === "phone") {
      const verificationCodeWithSpace = verificationCode
        .toString()
        .split("")
        .join(" ");
      await client.calls.create({
        twiml: `<Response><Say>Your verification code is ${verificationCodeWithSpace}. Your verification code is ${verificationCodeWithSpace}.</Say></Response>`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });
      res.status(200).json({
        success: true,
        message: `OTP sent.`,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Invalid verification method.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Verification code failed to send.",
    });
  }
}
const login = async (req, res) => {
    try{
      const { email, password } = req.body;
      if (!email || !password) {
      return next(new ErrorHandler("Email and password are required.", 400));
      }
      const user = await User.findOne({ email, accountVerified: true }).select(
        "+password"
      );
      if (!user) {
         return next(new ErrorHandler("Invalid email or password.", 400));
      }
      const isPasswordMatched = await user.comparePassword(password);
      if (!isPasswordMatched) {
          return next(new ErrorHandler("Invalid email or password.", 400));
      }
      const token = jwt.sign({_id:userData._id, emailId:userData.email},"asffds",{expiresIn:3600});
        res.cookie('token',token,{maxAge:60*60*1000});
      const reply={
            name:userData.name,
            emailId:userData.email,
            _id:userData._id
        }
      res.status(201).json({
            user:reply,
            message:"otp is verified !" 
        })
      }catch(err){
        res.status(500).json({
        error:err.message
    })
    }
  };
const logout = async (req,res)=>{
  try{
  res.status(200).cookie("token","",{
    expires:new Date(Date.now()),
    httpOnly:true,
  }).json({
    success:true,
    message:"logged out successfully "
  })
  }catch(err){
  res.status(500).json({
    success:false,
    message:"fail to logout"
  })
  }
}





    module.exports={register,verifyOtp,login,logout}