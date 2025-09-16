import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { IncrementItems, DecrementItems, ClearCart } from "../Store/CardSlicer";
import axiosClient from "../axiosClient/axiosClient";
import SuccessComponent from "../Components/CheckoutPageComponents/OrderSuccessComponent";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  useEffect(()=>{
    if (!isAuthenticated){
      navigate('/')
    }
  },[])
  let dummyAddresses;
  const items = useSelector((state) => state.cartslice.items);
  useEffect(()=>{
    const fetchAddress=async ()=>{
    try{
      const addressList= await axiosClient.get('/detail/getAddress')
      dummyAddresses= addressList.data;
    }catch(error){
      console.log(error)
      dummyAddresses = [
    { id: 1, type: "Home", details: "123 Main Street, Delhi" },
    { id: 2, type: "Work", details: "456 Corporate Lane, Delhi" },
  ];
    }
  }
  fetchAddress()
  },[user])
  dummyAddresses = [
    { id: 1, type: "Home", details: "123 Main Street, Delhi" },
    { id: 2, type: "Work", details: "456 Corporate Lane, Delhi" },
  ];  

  const [selectedAddress, setSelectedAddress] = useState(dummyAddresses[0].id);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Success state
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  function handleIncrementItems(restData) {
    if (!isAuthenticated) navigate("/login");
    dispatch(IncrementItems(restData));
  }
  function handleDecrementItems(restData) {
    if (!isAuthenticated) navigate("/login");
    dispatch(DecrementItems(restData));
  }

  const subtotal = items.reduce((acc, i) => acc + (i.price / 100) * i.quantity, 0);
  let deliveryFee = 49;
  if (items.length==0) deliveryFee=0;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + taxes;

  // Razorpay loader
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const onlinePayment = async (price) => {
    try {
      const response = await axiosClient.post("/payment/createOrder", {
        totalAmount: price,
      });
      const data = response.data;

      const paymentObject = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id: data.id,
        handler: async function (response) {
          try {
            const verifyRes = await axiosClient.post("/payment/verifyPayment", {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              dispatch(ClearCart());
              setOrderDetails({
                items,
                address: dummyAddresses.find((a) => a.id === selectedAddress),
                paymentMethod,
                total,
              });
              setOrderSuccess(true);
            } else {
              alert("Payment failed");
            }
          } catch (err) {
            console.log(err);
          }
        },
      });
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const codPayment = async (data) => {
    try {
      const response = await axiosClient.post("/payment/cod", data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-15 pb-12 px-4 relative">
      {/* ✅ Checkout Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Cart Items */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart</h2>
          <div className="overflow-y-auto flex-col max-h-[500px]">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-3 rounded-2xl shadow-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    draggable="false"
                    className="h-20 w-20 object-cover rounded-xl"
                    src={
                      "https://media-assets.swiggy.com/swiggy/image/upload/" +
                      item?.imageId
                    }
                    alt={item.name}
                  />
                  <div>
                    <p className="font-semibold text-lg text-gray-800">
                      {item.name}
                    </p>
                    <p className="font-bold text-gray-700">₹{item.price / 100}</p>
                  </div>
                </div>
                <div className="flex items-center border rounded-xl overflow-hidden">
                  <button
                    onClick={() => handleDecrementItems(item)}
                    className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-lg">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrementItems(item)}
                    className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Checkout Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 sticky top-28">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Checkout</h2>

          {/* Address */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">Delivery Address</p>
            {dummyAddresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => setSelectedAddress(addr.id)}
                className={`border p-3 rounded-xl mb-2 cursor-pointer ${
                  selectedAddress === addr.id
                    ? "border-[#ff5200] bg-orange-50"
                    : "border-gray-300"
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
              <label
                className={`flex-1 flex items-center gap-2 p-2 border rounded-xl cursor-pointer ${
                  paymentMethod === "cod"
                    ? "border-[#ff5200] bg-orange-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-[#ff5200] w-4 h-4"
                />
                <span className="text-gray-700 font-medium text-sm">
                  Cash on Delivery
                </span>
              </label>
              <label
                className={`flex-1 flex items-center gap-2 p-2 border rounded-xl cursor-pointer ${
                  paymentMethod === "online"
                    ? "border-[#ff5200] bg-orange-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-[#ff5200] w-4 h-4"
                />
                <span className="text-gray-700 font-medium text-sm">
                  Online Payment
                </span>
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

            <button
              onClick={async () => {
                if (items.length === 0) {
      alert("Your cart is empty. Please add items before placing an order.");
      return;
    }
                if (paymentMethod === "cod") {
                  const res = await codPayment({
                    items,
                    selectedAddress,
                    paymentMethod,
                    total,
                    userId: user.user._id,
                  });
                  dispatch(ClearCart());
                  setOrderDetails({
                    items,
                    address: dummyAddresses.find((a) => a.id === selectedAddress),
                    paymentMethod,
                    total,
                    orderId: res?.data?.orderId || "N/A",
                  });
                  setOrderSuccess(true);
                } else {
                  await onlinePayment(total);
                }
              }}
              className="w-full mt-4 bg-[#ff5200] text-white py-3 rounded-xl font-bold shadow-md hover:bg-orange-600 transition"
            >
              Place Order →
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Success Overlay */}
      {orderSuccess && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
          <SuccessComponent order={orderDetails} onClose={() => setOrderSuccess(false)} />
        </div>
      )}
    </div>
  );
}
