import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Navigate, useParams } from "react-router";
import axiosClient from "../axiosClient/axiosClient";
// import { toast } from "react-toastify";


const ResetPassword = () => {
 const {isAuthenticated,error,loading} = useSelector((state)=>state.auth)
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    await axiosClient.post(`/user/resetPassword/${token}`,
        { password, confirmPassword }
      )
      .then((res) => {
        // toast.success(res.data.message);
        // setUser(res.data.user);
        console.log("password change successfully")
      })
      .catch((error) => {
        // toast.error(error.response.data.message);
        console.log(error)
      });
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-50 px-4">
    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
        Reset Password
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Enter your new password below.
      </p>

      <form className="space-y-5" onSubmit={handleResetPassword}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-700 placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-purple-700 transition duration-200"
        >
          Reset Password
        </button>
      </form>

      <div className="mt-6 text-center">
        <a
          href="/login"
          className="text-purple-600 hover:underline text-sm font-medium"
        >
          Back to Login
        </a>
      </div>
    </div>
  </div>
</>

  );
};

export default ResetPassword;