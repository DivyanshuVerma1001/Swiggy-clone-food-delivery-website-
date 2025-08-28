    const User= require("../model/user")
    const jwt = require('jsonwebtoken')
    const bcrypt = require("bcrypt");
    const generateVerificationCode= require("../utils/verificationCodeGenerator")
    const register=async (req,res)=>{
        try{
            let {name,email,password,phone,verificationMethod}= req.body;
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
            res.status(200).json({
                message:"user resgister successfully",
                userInfo,
            })


        }
        else if (user.accountVerification.length<=3){
            const verificationCode= generateVerificationCode();
            verificationObj.verificationMethod= verificationMethod;
            verificationObj.verificationCode = verificationCode;

            user.accountVerification= [verificationObj,...user.accountVerification];
            const userInfo =await user.save();
            res.status(200).json({
                message:"user register successfully",
                userInfo,
            })
        }
            
        }
        catch(err){
        return res.status(400).json({ error: err.message });
        }
    }
    const verifyOtp = async (req,res)=>{
        const { email, otp, phone } = req.body;
        try{
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
                 user = userData.accountVerification[0]; 
                 userData.accountVerification=[user];
             }
             else {
                 user = userData.accountVerification[0];

            }
             if (user.verificationCode != Number(otp)){
                  throw new Error("invaild otp ")
        }
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


    module.exports={register,verifyOtp}