import React, { use, useEffect, useState } from "react";
import {  User,  Mail,  Phone,  MapPin,  Edit2,  LogOut,  List,  Home,  Calendar,  CreditCard,  Utensils,  Gift,} from "lucide-react";
import axiosClient from "../axiosClient/axiosClient";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function ProfilePage() { 
  
    const[addressTitle,setAddressTitle]=useState("")
    const[addressDetail,setAddressDetail]=useState("")
    const [addressList , setAddressList]=useState([])
    const [addingAddress,setAddingAddress]= useState(false)
    const [activeTab, setActiveTab] = useState("profile"); 
    const [orderList,setOrderList]= useState([]);


    const {isAuthenticated,loading,user} = useSelector((state)=>state.auth)
    const navigate= useNavigate()
  useEffect(()=>{
    if (!isAuthenticated){
      navigate('/')
    }
  },[])
    useEffect(() => {
    const fetchOrders = async () => {
      try {
        const list = await axiosClient.get("/detail/orders", {
          params: { userId: user?.user?._id }, // safer: user id as query param
        });
        setOrderList(list.data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    if (user) fetchOrders();
  }, [user]);
  
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const list = await axiosClient.get("/detail/getAddress");
        console.log("list",list)
        setAddressList(list.data.addressList || []);
      } catch (err) {
        console.error("Error fetching Address", err);
      }
    };

    if (user) fetchAddresses();
    console.log("address List",addressList)
  }, [user]);

  const addAddress= async(data)=>{
    try{
      const address= await axiosClient.post('/detail/addAddress',data)
    }catch(error){
      console.log(error )
    }
  }
console.log("address list",addressList)
  
    const user1 = {
    name: "Divyanshu Verma",
    email: "divyanshu@example.com",
    phone: "+91 9876543210",
    address: "Delhi, India",
    dob: "12 Jan 2003",
    gender: "Male",
    payment: "UPI - Google Pay",
    cuisine: "North Indian, Chinese",
    points: 240,
    membership: "Gold Member",
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-white sticky shadow-lg p-6 border-r border-gray-200">
        <h2 className="text-xl font-bold mb-6">My Account</h2>
        <ul className="space-y-4 text-gray-700">
          <li
            className={`flex items-center gap-3 cursor-pointer hover:text-orange-600 ${
              activeTab === "profile" ? "text-orange-600 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={18} /> Profile
          </li>
          <li
            className={`flex items-center gap-3 cursor-pointer hover:text-orange-600 ${
              activeTab === "orders" ? "text-orange-600 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            <List size={18} /> Orders
          </li>
          <li
            className={`flex items-center gap-3 cursor-pointer hover:text-orange-600 ${
              activeTab === "address" ? "text-orange-600 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("address")}
          >
            <Home size={18} /> Addresses
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:text-red-600 mt-10">
            <LogOut size={18} /> Logout
          </li>
        </ul>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === "profile" && (
          <div>
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Profile Details</h1>
                <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600">
                  <Edit2 size={16} /> Edit
                </button>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex items-center gap-3">
                  <User className="text-gray-600" />
                  <span className="font-medium">{user1.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-600" />
                  <span>{user1.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-600" />
                  <span>{user1.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-gray-600" />
                  <span>{user1.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-600" />
                  <span>{user1.dob}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="text-gray-600" />
                  <span>{user1.gender}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="text-gray-600" />
                  <span>{user1.payment}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Utensils className="text-gray-600" />
                  <span>{user1.cuisine}</span>
                </div>
              </div>
            </div>

            {/* Rewards */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white mb-6">
              <h2 className="text-xl font-semibold">🍔 Foodie Rewards</h2>
              <p className="mt-2">
                You have <b>{user1.points} points</b>
              </p>
              <p className="mt-1">
                Status: <b>{user1.membership}</b>
              </p>
              <button className="mt-3 bg-white text-orange-600 px-4 py-2 rounded-xl hover:bg-gray-200">
                Redeem Rewards
              </button>
            </div>

            {/* Offers Section */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Gift className="text-orange-500" /> Available Offers
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="p-3 bg-gray-50 rounded-xl border hover:shadow">
                  🎉 Get 20% OFF on your next order above ₹500
                </li>
                <li className="p-3 bg-gray-50 rounded-xl border hover:shadow">
                  🚚 Free Delivery on orders above ₹199
                </li>
                <li className="p-3 bg-gray-50 rounded-xl border hover:shadow">
                  💳 10% Cashback with HDFC Bank Cards
                </li>
              </ul>
            </div>
          </div>
        )}

{activeTab === "orders" && (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h1 className="text-2xl font-bold mb-4">My Orders</h1>

    {orderList.length === 0 ? (
      <p className="text-gray-600">You haven’t ordered anything yet 🍕</p>
    ) : (
      <div className="space-y-4">
        {orderList.map((order) => (
          <div key={order._id} className="border rounded-xl p-4 shadow-sm">
            <h2 className="font-semibold text-lg mb-2">
              Order ID: {order._id}
            </h2>
            <p className="text-gray-700">📍 Address: {order.address}</p>
            <p className="text-gray-700">
              💳 Payment: {order.methodOfPayment.toUpperCase()}
            </p>
            <p className="text-gray-700">💰 Total: ₹{order.total}</p>

            <h3 className="mt-3 font-medium">🍴 Items:</h3>
            <ul className="list-disc list-inside">
              {order.foodItems.map((item) => (
                <li key={item._id}>
                  {item.name} × {item.quantity} — ₹{item.price}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}
  </div>
)}

        {activeTab === "address" && (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h1 className="text-2xl font-bold mb-4">Saved Addresses</h1>

    {/* Show saved addresses */}
    {addressList.length > 0 ? (
      <div className="space-y-4">
        {addressList.map((address) => (
          <div
            key={address._id}
            className="border rounded-xl p-4 shadow-sm bg-gray-50"
          >
            <h2 className="font-semibold text-lg">{address.title}</h2>
            <p className="text-gray-700">{address.address}</p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-600">No addresses saved yet 🏠</p>
    )}

    {/* Add Address Form */}
    {addingAddress && (
      <div className="mt-4 space-y-2">
        <input
          type="text"
          placeholder="Title (e.g. Home, Office)"
          value={addressTitle}
          onChange={(e) => setAddressTitle(e.target.value)}
          className="w-full border rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="Address details"
          value={addressDetail}
          onChange={(e) => setAddressDetail(e.target.value)}
          className="w-full border rounded-lg p-2"
        />
        <button
          onClick={async () => {
            await addAddress({
              newAddress: { title: addressTitle, address: addressDetail },
            });
            setAddressTitle("");
            setAddressDetail("");
            setAddingAddress(false);
            // refresh address list
            const list = await axiosClient.get("/detail/getAddress");
            setAddressList(list.data.addressList || []);
          }}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
        >
          Save Address
        </button>
      </div>
    )}

    {/* Button to open form */}
    {!addingAddress && (
      <button
        onClick={() => setAddingAddress(true)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        + Add New Address
      </button>
    )}
  </div>
)}

      </div>
    </div>
  );
}
