const User = require("../model/user");


const getOrders= async (req,res)=>{
    try{
    const {userId} = req.query;
    if (!userId) throw new Error("user Id not found ");
    console.log(userId)
    const userData= await User.findById(userId);
    if (!userData) throw new Error ("user deatil not found ");
    const orders= userData.orders;
    res.status(200).json({
        success:true,
        orders
    })
    }catch(error){
    console.log(error)
    res.status(500).send(error)
    }
}


module.exports= {getOrders}