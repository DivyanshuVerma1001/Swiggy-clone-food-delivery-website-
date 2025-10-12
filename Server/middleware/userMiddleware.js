const jwt = require("jsonwebtoken")
const User= require('../model/user')

const userMiddleware= async (req,res,next)=>{
    try{
        console.log('Middleware - Cookies received:', req.cookies);
        const {token}=req.cookies;
        if(!token){
            console.log('Middleware - No token found in cookies');
            throw new Error("Token is not present")
        }
        console.log('Middleware - Token found, verifying...');
        const payload= jwt.verify(token,process.env.JWT_KEY)
        const {_id}= payload;
        if (!_id){
            console.log('Middleware - Invalid token payload');
            throw new Error("Invaild token")
        }
        console.log('Middleware - Looking up user with ID:', _id);
        const result = await User.findById(_id)
        if (!result){
            console.log('Middleware - User not found in database');
            throw new Error("user doesn't exist")
        }

        console.log('Middleware - User found:', result.name);
        req.result= result
        next()

    }
    catch(err){
        console.log('Middleware - Error:', err.message);
        res.status(401).json({ message: err.message });
    }
}
module.exports = userMiddleware;