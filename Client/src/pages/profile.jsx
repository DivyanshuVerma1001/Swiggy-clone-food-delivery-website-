import React, { use, useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Edit2, LogOut, List, Home, Calendar, CreditCard, Utensils, Gift,IndianRupee } from "lucide-react";
import axiosClient from "../axiosClient/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../Store/authSlice"
export default function ProfilePage() {

  const [addressTitle, setAddressTitle] = useState("")
  const [addressDetail, setAddressDetail] = useState("")
  const [addressList, setAddressList] = useState([])
  const [addingAddress, setAddingAddress] = useState(false)
  const [activeTab, setActiveTab] = useState("profile");
  const [orderList, setOrderList] = useState([]);
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      dispatch(logoutUser());
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const { isAuthenticated, loading, user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [])
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const list = await axiosClient.get("/detail/orders", {
          params: { userId: user?.user?._id }, // safer: user id as query param
        });
        setOrderList(list.data.orders || []);
        console.log("orderlist:",list.data)
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
        console.log("list", list)
        setAddressList(list.data.addressList || []);
      } catch (err) {
        console.error("Error fetching Address", err);
      }
    };

    if (user) fetchAddresses();
    console.log("address List", addressList)
  }, [user]);

  const addAddress = async (data) => {
    try {
      const address = await axiosClient.post('/detail/addAddress', data)
    } catch (error) {
      console.log(error)
    }
  }
  // console.log("address list", addressList)
  const [userInfo,setUserInfo]=useState({
    name: "N/A",
    email: "N/A",
    phone: "N/A",
    address: "Delhi, India",
    dob: "N/A",
    gender: "N/A",
    payment: "UPI - Google Pay",
    cuisine: "North Indian, Chinese",
    points: 240,
    membership: "Gold Member",
  })

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const list = await axiosClient.get("/detail/getUserInfo");
        console.log("info list", list)
        const detail=list.data.userInfo || {};
        userInfo.name= detail.name;
        userInfo.email=detail.email;
        userInfo.phone= detail.number;
        setUserInfo(userInfo)
      } catch (err) {
        console.error("Error fetching userDetail", err);
      }
    };

    if (user) fetchUserInfo();
   
  }, [user]);


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-white sticky shadow-lg p-6 border-r border-gray-200">
        <h2 className="text-xl font-bold mb-6">My Account</h2>
        <ul className="space-y-4 text-gray-700">
          <li
            className={`flex items-center gap-3 text-[18px] hover:bg-slate-100 p-2 cursor-pointer hover:text-orange-600 ${activeTab === "profile" ? "text-orange-600 font-semibold  bg-orange-50" : ""
              }`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={20} /> Profile
          </li>
          <li
            className={`flex items-center gap-3 text-[18px] hover:bg-slate-100 p-2 cursor-pointer hover:text-orange-600 ${activeTab === "orders" ? "text-orange-600 font-semibold bg-orange-50" : ""
              }`}
            onClick={() => setActiveTab("orders")}
          >
            <List size={20} /> Orders
          </li>
          <li
            className={`flex items-center gap-3 text-[18px] hover:bg-slate-100 p-2 cursor-pointer hover:text-orange-600 ${activeTab === "address" ? "text-orange-600 font-semibold  bg-orange-50" : ""
              }`}
            onClick={() => setActiveTab("address")}
          >
            <Home  size={20} /> Addresses
          </li>
          <li onClick={onSubmit} className="flex items-center text-[18px] hover:bg-red-100 p-2 gap-3 cursor-pointer hover:text-red-600 mt-10">
            <LogOut size={20} /> Logout
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
                  <span className="font-medium">{userInfo.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-600" />
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-600" />
                  <span>{userInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-gray-600" />
                  <span>{userInfo.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-600" />
                  <span>{userInfo.dob}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="text-gray-600" />
                  <span>{userInfo.gender}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="text-gray-600" />
                  <span>{userInfo.payment}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Utensils className="text-gray-600" />
                  <span>{userInfo.cuisine}</span>
                </div>
              </div>
            </div>

            {/* Rewards */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white mb-6">
              <h2 className="text-xl font-semibold">🍔 Foodie Rewards</h2>
              <p className="mt-2">
                You have <b>{userInfo.points} points</b>
              </p>
              <p className="mt-1">
                Status: <b>{userInfo.membership}</b>
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
          <div className="bg-gray-50 min-h-[70vh] p-6 rounded-3xl shadow-lg">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-orange-400 pb-2">
              My Orders
            </h1>

            {orderList.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-20">
                <p className="text-gray-500 text-lg mb-4">You haven’t ordered anything yet 🍕</p>
                <img src="/assets/empty-orders.svg" alt="No orders" className="w-48 h-48 opacity-70" />
                <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all">
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orderList.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-orange-400 hover:shadow-lg transition-all w-full"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-semibold text-xl text-gray-800">
                        Order #{order._id.slice(0, 10).toUpperCase()}
                      </h2>
                      <span className="text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-gray-700 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-orange-500" /> Address: {order.address}
                      </p>
                      <p className="text-gray-700 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-orange-500" /> Payment: {order.methodOfPayment.toUpperCase()}
                      </p>
                      <p className="text-gray-700 flex items-center gap-2 font-semibold">
                        <IndianRupee className="w-5 h-5 text-orange-500" /> Total: ₹{order.total}
                      </p>
                    </div>

                    <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                      <Utensils className="text-orange-500 w-5 h-5" /> Items:
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {order.foodItems.map((item) => (
                        <li key={item._id} className="flex justify-between items-center">
                          <span>{item.name} × {item.quantity}</span>
                          <span className="font-semibold">₹{item.price}</span>
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
                <div className="flex gap-2">
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
                <button onClick={()=> setAddingAddress(false)} className="bg-gray-300 border-slate-300 border-2 font-heading  text-slate-800 px-2 py-1 rounded-lg cursor-pointer hover:bg-gray-200">
                  Cancel
                </button>
                </div>
              </div>
            )}

            {/* Button to open form */}
            {!addingAddress && (
              <button
                onClick={() => setAddingAddress(true)}
                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                Add New Address
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
