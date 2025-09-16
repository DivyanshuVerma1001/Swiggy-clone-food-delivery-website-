const User = require("../model/user");
const createRazorpayInstance = require("../utils/razorpayConfig");
const razorpayInstance = createRazorpayInstance()

const createOrder = async (req, res) => {
    const { totalAmount } = req.body;
    const option = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: `receipt_order_1`
    }
    try {

        razorpayInstance.orders.create(option, (err, order) => {
            if (err) {
                return res.send.status(500).json({
                    success: false,
                    message: "something went wrong"
                })
            }
            return res.status(200).json(order)
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}

const verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature } = req.body;
    try {
        const secret = process.env.RAZORPAY_KEY_SECRET;
        //creating hmac object
        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(order_id + "|" + payment_id);
        const generatedSignature = hmac.digest('hex');
        if (generatedSignature === signature) {
            return res.status(200).json({
                success: true,
                message: "Payment verified"
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Payment not verified"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error "
        })
    }
}
const codPayment = async (req, res) => {
    try{
    const { items, paymentMethod, selectedAddress, total ,userId} = req.body;
    console.log("userDetail",userId);
    const user= await User.findById(userId);
    if (!user){
        throw new error("user not found")
    }
    // console.log(items, paymentMethod, selectedAddress, total)
    const newArray = items.map(({ name, price, imageId,quantity }) => ({
        name,
        price,
        imageId,
        quantity
    }));
    const obj={
        foodItems:newArray,
        total:total,
        address:selectedAddress,
        methodOfPayment:paymentMethod
    }
    user.orders.unshift(obj);
    await user.save();
    // console.log(newArray)
    res.json({
        success: true
    })
}catch(error){
    console.log(error)
    res.status(500).json({
        success:false
    })
}
}

module.exports = { createOrder, verifyPayment, codPayment }