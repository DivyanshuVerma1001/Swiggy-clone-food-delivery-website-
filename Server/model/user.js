const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
        minLength: [8, 'Length must have atleast 8 characters']
    },
    phone: {
        type: String
    },
    accountVerified: {
        type: Boolean
    },
    accountVerification: [
        {
            verificationCode: {
                type: Number
            },
            verificationCodeExpire: {
                type: Number
            },
            createdAt: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    resetPassword: {
        resetPasswordToken: {
            type: String
        },
        resetPasswordExpire: {
            type: Date
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    orders: [{
        foodItems: [
            {
                name: String,
                price: String,
                quantity: String
            }
        ],
        orderId: String,
        total: String,
        address: String,
        methodOfPayment: {
            type: String,
            enum: ["Cash on delivery", "online"]
        },
        date:{
            type:Date,
            default: Date.now
        }
    }
    ],
    userAddresses:[
        {
            title:String,
            address:String
        }
    ]
})
const User = mongoose.model("UserCollection", userSchema);
module.exports = User;