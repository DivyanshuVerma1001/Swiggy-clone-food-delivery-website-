import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router"
import {IncrementItems,DecrementItems} from "../Store/CardSlicer"
import axiosClient from "../axiosClient/axiosClient";

export default function CheckoutPage() {


  const dispatch=useDispatch();
      const navigate= useNavigate()

  const {isAuthenticated}= useSelector(state=>state.auth)

  const dummyAddresses = [
    { id: 1, type: "Home", details: "123 Main Street, Delhi" },
    { id: 2, type: "Work", details: "456 Corporate Lane, Delhi" },
  ];
  const items= useSelector(state=>state.cartslice.items);

  const [selectedAddress, setSelectedAddress] = useState(dummyAddresses[0].id);
  const [paymentMethod, setPaymentMethod] = useState("cod");


    function handleIncrementItems(restData){
       if (isAuthenticated==false){
            console.log("kya authenticated hai :",isAuthenticated)
            navigate('/login');
        }
        dispatch(IncrementItems(restData))  
    }
    function handleDecrementItems(restData){
        if (isAuthenticated==false){
            navigate('/login');
        }
        dispatch(DecrementItems(restData));
    }
  const subtotal = items.reduce((acc, i) => acc + i.price/100 * i.quantity, 0);
  const deliveryFee = 49;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + taxes;
// payment gateway
const loadScript= (src)=>{
  return new Promise((resolve)=>{
    const script= document.createElement('script');
    script.src=src;
    script.onload=()=>{
      resolve(true)
    }
    script.onerror=()=>{
      resolve(false);
    }
    document.body.appendChild(script);
  })
}
  const onPayment = async (price)=>{
    // create order
    try{
      const option= {
   
        totalAmount:price
      }
      const response= await axiosClient.post('/payment/createOrder',option)
      const data= response.data;
      console.log(data);
      const paymentObject= new window.Razorpay({
        key:import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id:data.id,
        //handler will will be called when payment is successfull and we want to verify it at backend 
        handler: async function (response){
           const option2={
            order_id: response.razorpay_order_id,
            payment_id:response.razorpay_payment_id,
            signature:response.razorpay_signature,
           }
           axiosClient.post('/payment/verifyPayment',option2).then((res)=>{
            console.log(res.data);
           })
           .catch((err)=>{
            console.log(err)
            if (res.data.success){
              alert('payment success')
            }
            else{
              alert ("payment failed")
            }
           })
        }
      })
      paymentObject.open();
    }catch(error){
      console.log(error)
    }
  }
useEffect(()=>{
  loadScript("https://checkout.razorpay.com/v1/checkout.js")

},[])




  return (
    <div className="min-h-screen bg-gray-50 pt-15 pb-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Cart Items */}
        <div className="space-y-4 ">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart</h2>
          <div className="overflow-y-auto flex-col flex-y-auto max-h-[500px]">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-2xl shadow-md">
              <div className="flex items-center gap-4">
               <img draggable="false" className="h-20 w-20 object-cover rounded-xl" src={"https://media-assets.swiggy.com/swiggy/image/upload/"+item?.imageId} alt={item.name} />
 
                <div>
                  <p className="font-semibold text-lg text-gray-800">{item.name}</p>
                  <p className="font-bold text-gray-700">₹{item.price/100}</p>
                </div>
              </div>
              <div className="flex items-center border rounded-xl overflow-hidden">
                <button
                  onClick={() => handleDecrementItems(item)}
                  className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200"
                >-</button>
                <span className="px-4 py-1 text-lg">{item.quantity}</span>
                <button
                  onClick={() => handleIncrementItems(item)}
                  className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200"
                >+</button>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Right: Summary + Address + Payment */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 sticky top-28">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Checkout</h2>

          {/* Address */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">Delivery Address</p>
            {dummyAddresses.map(addr => (
              <div
                key={addr.id}
                onClick={() => setSelectedAddress(addr.id)}
                className={`border p-3 rounded-xl mb-2 cursor-pointer ${
                  selectedAddress === addr.id ? "border-[#ff5200] bg-orange-50" : "border-gray-300"
                }`}
              >
                <p className="font-medium text-gray-700">{addr.type}</p>
                <p className="text-gray-600 text-sm">{addr.details}</p>
              </div>
            ))}
          </div>

          {/* Payment */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">Payment Method</p>
            <div className="flex gap-3">
              <label className={`flex-1 flex items-center gap-2 p-2 border rounded-xl cursor-pointer ${
                paymentMethod === "cod" ? "border-[#ff5200] bg-orange-50" : "border-gray-300"
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-[#ff5200] w-4 h-4"
                />
                <span className="text-gray-700 font-medium text-sm">Cash on Delivery</span>
              </label>
              <label className={`flex-1 flex items-center gap-2 p-2 border rounded-xl cursor-pointer ${
                paymentMethod === "online" ? "border-[#ff5200] bg-orange-50" : "border-gray-300"
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-[#ff5200] w-4 h-4"
                />
                <span className="text-gray-700 font-medium text-sm">Online Payment</span>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-gray-600 mb-1">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-1">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Taxes</span>
              <span>₹{taxes}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button onClick={()=>onPayment(total)} className="w-full mt-4 bg-[#ff5200] text-white py-3 rounded-xl font-bold shadow-md hover:bg-orange-600 transition">
              Place Order →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
