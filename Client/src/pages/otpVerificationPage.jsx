import React from "react";

import axios from "axios";
import { Navigate, useParams } from "react-router";
import { otpVerification } from "../Store/authSlice";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OtpVerification = () => {
   const {isAuthenticated,error,loading} = useSelector((state)=>state.auth)
   const dispatch= useDispatch();
    const {email,phone}=useParams();
    const [otp,setOtp]=useState(["","","","",""])
    const handleChange=(value,index)=>{
      if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
    }
    const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };
 const handleOtpVerification= async (e)=>{
  e.preventDefault();
  const enteredOtp= otp.join("");
  const data={
    email,otp:enteredOtp,phone
  }
  dispatch(otpVerification(data))
  
//   await axios.post("http://localhost:4000/api/v1/user/otp-verification",data,{
//     withCredentials:true,
//     headers:{'Content-type':'application/json'}
//   }).then((res)=>{
//     toast.success(res.data.message);
//     setIsAuthenticated(true);
//     setUser(res.data.user);
//   }).catch((err)=>{
//     toast.error(err.response.data.message);
//     setIsAuthenticated(false);
//     setUser(null)
//   })
 }
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return <>
  <div className="opt-verfication-page">
      <div className="opt-container">
        <h1>OPT Verfication </h1>
        <p>Enter the 5-digit OTP sent to your register email or phone.</p>
        <form onSubmit={handleOtpVerification} className="otp-form">
          <div className="opt-input-container">
            {otp.map((digit,index)=>{
              return (
                <input type="text"  id={`otp-input-${index}`} maxLength="1" key={index} value={digit} onChange={(e)=>handleChange(e.target.value,index)} onKeyDown={(e)=>handleKeyDown(e,index)} className="otp-input"/>
              )
            })}
          </div>
          <button type="submit" className="verify-button">Verify OTP</button>

        </form>

      </div>

  </div>
  </>;
};

export default OtpVerification;