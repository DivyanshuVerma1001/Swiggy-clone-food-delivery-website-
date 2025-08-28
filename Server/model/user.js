const mongoose = require('mongoose')
const {Schema}= mongoose;

const userSchema= new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String,
        minLength:[8,'Length must have atleast 8 characters']
    },
    phone:{
        type:String
    },
    accountVerified:{
        type:Boolean
    },
    accountVerification:[
                {
                verificationCode:{ 
                    type:Number
                },
                verificationCodeExpire:{
                    type:Number
                },
                createdAt:{
                    type:Date,
                    default:Date.now,
                }
                }
            ]
    
    
})
const User= mongoose.model("UserCollection",userSchema);
module.exports= User;