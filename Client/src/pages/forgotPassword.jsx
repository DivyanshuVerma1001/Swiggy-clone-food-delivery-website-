import { useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../axiosClient/axiosClient";
import { toast } from "react-toastify";

const ForgotPassword = () => {
 const {isAuthenticated,error,loading} = useSelector((state)=>state.auth)
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    await axiosClient.post(
        "http://localhost:3000/user/forgotPassword",{ email },)
      .then((res) => {
   
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
   <>
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
        Forgot Password
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Enter your email address to receive a password reset link.
      </p>

      <form onSubmit={handleForgotPassword} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  </div>
</>

  );
};

export default ForgotPassword;