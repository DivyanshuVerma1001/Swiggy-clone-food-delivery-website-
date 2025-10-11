    const User= require("../model/user")
    const jwt = require('jsonwebtoken')
    const crypto = require("crypto");

    const bcrypt = require("bcrypt");
    const generateVerificationCode= require("../utils/verificationCodeGenerator")
    const generateEmailTemplate= require("../utils/emailTemplate")
    const generateResetPasswordToken= require('../utils/generateResetToken')
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
        const token = jwt.sign({_id:userData._id, emailId:userData.email},process.env.JWT_KEY,{expiresIn:3600});
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
    res.status(500).json({
      success: false,
      message: "Verification code failed to send.",
    });
  }
}
const login = async (req, res) => {
    try{
      console.log("login api started , req.body:",req.body)
        const {email, password}=req.body;
        if(!email){
            throw new Error("Invalid Credential email !")
        }
        if(!password){
            throw new Error("Invaild Credentail passworrd !")
        }
      const userData = await User.findOne({ email, accountVerified: true }).select(
        "+password"
      );
      if (!userData) {
         throw new Error("Invalid email or password.");
      }
      const match = await bcrypt.compare(password,userData.password)
        if (!match){
            throw new Error("Invaild Credential not matched!")
        }
      const token = jwt.sign({_id:userData._id, emailId:userData.email},process.env.JWT_KEY,{expiresIn:3600});
        res.cookie('token',token,{maxAge:60*60*1000,  secure: true    });
      const reply={
            name:userData.name,
            email:userData.email,
            _id:userData._id
        }
      res.status(201).json({
            user:reply,
            message:"login successfully" 
        })
      }catch(err){
        console.log("Error in login :",err);
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

 const forgotPassword = async (req, res) => {
console.log("forgot password api called")
  const user = await User.findOne({
    email: req.body.email,
    accountVerified: true,
  });
  const x = await User.find();
  console.log(x)
  console.log(req.body.email)
  if (!user) {
    throw new Error("User not found.");
  }
  const resetToken = generateResetPasswordToken();
  user.resetPassword.resetPasswordExpire= Date.now() + 15 * 60 * 1000;
  user.resetPassword.resetPasswordToken=resetToken
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

  const message = `Your Reset Password Token is:- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it.`;

  try {
    sendEmail({
      email: user.email,
      subject: "MERN AUTHENTICATION APP RESET PASSWORD",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPassword.resetPasswordToken = undefined;
    user.resetPassword.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(400).json({
        error:error.message ? error.message : "Cannot send reset password token."
    }
      )
    ;
  }
};
const resetPassword = async (req, res) => {
  try{
  const { token } = req.params;
  console.log("this reset password")
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
    console.log("done")
//   const user = await User.findOne({
//   "resetPassword.resetPasswordToken": resetPasswordToken,
//   "resetPassword.resetPasswordExpire": { $gt: Date.now() },
// });
const user = await User.findOne()
console.log("user mil gya :",user)

  if (!user) {
    throw new Error("Reset password token is invalid or has been expired.")
  }
  console.log("user mil gya ");
  if (req.body.password !== req.body.confirmPassword) {
    throw new Error("Password & confirm password do not match.");
  }
  let password= req.body.password;
  password = await bcrypt.hash(password,10);
  user.password = password;
  user.resetPassword.resetPasswordToken = undefined;
  user.resetPassword.resetPasswordExpire = undefined;
  await user.save();
  res.status(200).json({
    message:"password updated successfully"
  })
}
catch(err){
  res.status(400).json({
    error:err
  })
}
  
};


module.exports={register,verifyOtp,login,logout,forgotPassword,resetPassword}