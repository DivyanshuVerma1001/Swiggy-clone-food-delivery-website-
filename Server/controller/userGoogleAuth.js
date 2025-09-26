
const {oauth2client}= require('../utils/googleConfig')
const jwt = require("jsonwebtoken")
const axios = require("axios");
const User = require('../model/user');
const googleLogin= async (req,res)=>{
    try{
      console.log("google login api started ")
        const {code}=req.query;
        console.log("code mil gya ",code)
        const googleRes= await oauth2client.getToken(code);
        // console.log("response bhi aa gaya ",googleRes)
        oauth2client.setCredentials(googleRes.tokens);
        const userRes= await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        )
        console.log("user ki detail bhi mil gyi ")
        console.log(userRes.data);
        const{email,name,picture}=userRes.data;
        let userData= await User.findOne({email});
        if (!userData) {
         throw new Error("Email does not exists");
      }
        const token = jwt.sign({_id:userData._id, emailId:userData.email},process.env.JWT_KEY,{expiresIn:3600});
        res.cookie('token',token,{maxAge:60*60*1000});
      const reply={
            name:userData.name,
            email:userData.email,
            _id:userData._id
        }
        console.log("google login api ne reponse bhi de diya ")
      res.status(201).json({
            user:reply,
            message:"login successfully" 
        }) 
       }catch (err) {
  console.error("Google OAuth Error:", err.response?.data || err.message);

  return res.status(500).json({
    message: "Internal server error",
    error: err.message,
    details: err.response?.data || null
  });
}
}

const googleRegister= async (req,res)=>{
    try{
        const {code}=req.query;
        console.log("code mil gya ",code)
        const googleRes= await oauth2client.getToken(code);
        // console.log("response bhi aa gaya ",googleRes)
        oauth2client.setCredentials(googleRes.tokens);
        const userRes= await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        )
        console.log("user ki detail bhi mil gyi ")
        console.log(userRes.data);
        const{email,name,picture}=userRes.data;
        let userData= await User.findOne({email});
        if (userData) {
         throw new Error("user already exists!");
      }
      console.log("checked for user if it is exist")
      userData= await User.create({
        name:name,
        email:email,
        accountVerified:true
      })
      console.log("data entered in database",userData);
        const token = jwt.sign({_id:userData._id, emailId:userData.email},process.env.JWT_KEY,{expiresIn:3600});
        res.cookie('token',token,{maxAge:60*60*1000});
      const reply={
            name:userData.name,
            email:userData.email,
            _id:userData._id
        }
      res.status(201).json({
            user:reply,
            message:"login successfully" 
        }) 
       }catch (err) {
  console.error("Google OAuth Error:", err.response?.data || err.message);

  return res.status(500).json({
    message: "Internal server error",
    error: err.message,
    details: err.response?.data || null
  });
}
}

module.exports= {googleLogin,googleRegister}