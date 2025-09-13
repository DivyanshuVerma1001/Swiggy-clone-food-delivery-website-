const createRazorpayInstance = require("../utils/razorpayConfig");
const razorpayInstance=createRazorpayInstance()

const createOrder= async (req,res)=>{
    const {totalAmount}= req.body;
    const option={
        amount:totalAmount*100,
        currency:"INR",
        receipt:`receipt_order_1`
    }
    try{

        razorpayInstance.orders.create(option,(err,order)=>{
            if(err){
                return res.send.status(500).json({
                    success:false,
                    message:"something went wrong"
                })
            }
            return res.status(200).json(order)
        })
    }catch(err){
        return res.status(500).json({
            success:false,  
            message:"something went wrong"
        })
    }
}

const verifyPayment= async(req,res)=>{
    const {order_id,payment_id,signature}= req.body;
    try{
    const secret= process.env.RAZORPAY_KEY_SECRET;
    //creating hmac object
    const hmac= crypto.createHmac('sha256',secret);
    hmac.update(order_id +"|"+payment_id);
    const generatedSignature = hmac.digest('hex');
    if (generatedSignature===signature){
        return res.status(200).json({
            success:true,
            message:"Payment verified"
        })
    }
    else {
        return res.status(400).json({
            success:false,
            message:"Payment not verified"
        })
    } 
}
catch(err){
    res.status(500).json({
        success:false,
        message:"Internal server error "
    })
    }
}

module.exports= {createOrder,verifyPayment}