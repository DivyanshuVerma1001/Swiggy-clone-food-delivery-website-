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
const addAddress=async (req,res)=>{
    try{
        const {newAddress}= req.body;
        if (!newAddress){
            throw new Error ("Address not found ")
        }
        const {title ,address}= newAddress;
        if (!title || !address){
            throw new Error ("Invaild address")
        }
        let userData =await User.findById( req.result._id);
        if (!userData){
            throw new Error ("user not found")
        }
        userData.userAddresses.push(newAddress);
        userData.save()
        res.status(200).json({
            success:true,
            message:"Address added successfully"
        })

    }catch(error){
        res.status(500).json({message:"Internal server error "})
    }
}
const getAddress=async (req,res)=>{
    try{
        const userdata= await User.findById(req.result._id);
        const addressList= userdata.userAddresses;
        res.status(200).json({
            addressList
        })

    }catch(error){
        res.status(200).json({
           
            success:false,
            message:"Internall server error "           
        })
    }
}

module.exports= {getOrders,addAddress,getAddress}