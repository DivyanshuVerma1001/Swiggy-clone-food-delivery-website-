import { loginUser ,registerUser} from "../../Store/authSlice"
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {useForm} from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router'

import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import GoogleLoginWrapper from "../../googleAuth/googleLoginWrapper";



const signupSchema= z.object({
    email:z.string().email(),
    password:z.string().min(8,"Password should contain atleast 8 character")
})
function Login(){
    const {register, handleSubmit,formState: {errors},}= useForm({resolver:zodResolver(signupSchema)})
    const dispatch= useDispatch()
    const navigate= useNavigate();
    const {isAuthenticated,error,loading} = useSelector((state)=>state.auth)
    useEffect(()=>{
      if(isAuthenticated){
        navigate('/')
      }
    },[isAuthenticated])

    const onSubmit=async (data)=>{
    try {
    console.log("Form Data", data);
    const reply =  dispatch(loginUser(data));
    console.log("reply", reply);
    
  } catch (err) {
    console.error("Error in login:", err);
  } finally {
    console.log("this is end");
  }
    }

    const submittedData= (data)=>{
        console.log(data)
    }
    

    return (
<>
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-50 px-4">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100"
    >
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
        Welcome Back
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Log in to your account to continue
      </p>

      {/* Google Auth */}
      <GoogleLoginWrapper />

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-3 text-sm text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Email */}
      <div className="form-control w-full mb-4">
        <label className="label">
          <span className="label-text text-gray-700 font-medium">Email</span>
        </label>
        <input
          {...register("email")}
          placeholder="Enter Email"
          autoFocus
          className={`input input-bordered w-full rounded-lg focus:ring-2 focus:ring-purple-500 ${
            errors.email && "input-error"
          }`}
        />
        {errors.email && (
          <span className="text-error text-sm mt-1">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Password */}
      <div className="form-control w-full mb-2">
        <label className="label">
          <span className="label-text text-gray-700 font-medium">
            Password
          </span>
        </label>
        <input
          {...register("password")}
          type="password"
          placeholder="Enter Password"
          className={`input input-bordered w-full rounded-lg focus:ring-2 focus:ring-purple-500 ${
            errors.password && "input-error"
          }`}
        />
        {errors.password && (
          <span className="text-error text-sm mt-1">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Forgot Password */}
      <div className="text-right mb-4">
        <NavLink
          to="/forgotPassword"
          className="text-sm text-purple-600 hover:underline"
        >
          Forgot password?
        </NavLink>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold text-white shadow-md transition duration-200 ${
          loading
            ? "bg-purple-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {loading ? "Logging in..." : "Log In"}
      </button>

      {/* Signup Link */}
      <div className="mt-6 text-center text-sm">
        Don’t have an account?{" "}
        <NavLink
          to="/signup"
          className="text-purple-600 hover:underline font-medium"
        >
          Sign up
        </NavLink>
      </div>
    </form>
  </div>
</>

);

}
export default Login