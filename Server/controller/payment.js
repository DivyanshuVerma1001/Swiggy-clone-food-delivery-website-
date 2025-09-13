
const createOrder= async (req,res)=>{
    const {totalAmount}= req.body;
    const option={
        amount:totalAmount*100,
        currency:"INR",
        receipt:`receipt_order_1`
    }
    try{

    }catch{
        
    }
}