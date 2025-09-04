const jwt = require("jsonwebtoken")
const User= require('../model/user')

const userMiddleware= async (req,res,next)=>{
    try{
        console.log(req.cookies);
        const {token}=req.cookies;
        if(!token){
            throw new Error("Token is not present")
        }
        const payload= jwt.verify(token,process.env.JWT_KEY)
        const {_id}= payload;
        if (!_id){
            throw new Error("Invaild token")
        }
        const result = await User.findById(_id)
        if (!result){
            throw new Error("user doesn't exist")
        }

        
        req.result= result
        console.log("this is user user user")
        next()


    }
    catch(err){
    res.status(401).json({ message: err.message });
}
}
module.exports = userMiddleware;