import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { registerUser } from '../../Store/authSlice';
import OtpVerification from './otpVerificationPage';
import GoogleRegisterWrapper from '../../googleAuth/googleRegisterWrapper';

//Schema validation for  signup 
const signupSchema = z.object({
  name: z.string().min(3, "Name should contain at least 3 characters"),
  email: z.string().email(),
  password: z.string().min(8, "Password should contain at least 8 characters"),
  phone: z.string().min(10, "Phone number should have 10 digits"), // optional: use z.string().regex(/^\d{10}$/)
  verificationMethod: z.enum(["email", "phone"])
});

function Signup(){
    const {register, handleSubmit,formState: {errors},}= useForm({resolver:zodResolver(signupSchema)})
    
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const {isAuthenticated,loading, error}= useSelector((state)=>state.auth);
    useEffect(()=>{
    if(isAuthenticated && !window.location.pathname.includes("otpverification")){
        navigate('/')
      }
      },[isAuthenticated])

    const onSubmit= async (data)=>{
    try {
    console.log("Form Data", data);
    const reply = await dispatch(registerUser(data));
    console.log("reply", reply);
    if (reply.payload.success){
        navigate(`/otpverification/${data.email}/${data.phone}`)
    }
  } catch (err) {
    console.error("Error in registerUser:", err);
  } finally {
    console.log("this is end");
  }
    }


return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100">
    <div className="flex w-full max-w-5xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
      
      {/* Left side illustration */}
      <div className="hidden md:flex w-1/2 bg-[url('/food-bg.jpg')] bg-cover bg-center" />

      {/* Right side form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
        <p className="text-sm text-gray-500 mb-6">Get your favorite meals delivered in minutes 🚀</p>

        <GoogleRegisterWrapper />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              {...register("name")}
              placeholder="John Doe"
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="example@email.com"
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <div className="flex">
              <span className="px-3 py-2 border rounded-l-lg bg-gray-100">+91</span>
              <input
                {...register("phone")}
                placeholder="9876543210"
                className="flex-1 px-4 py-2 border-t border-b border-r rounded-r-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>

          {/* Verification Method */}
          <div>
            <p className="text-sm font-medium mb-2">Verification Method</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" value="email" {...register("verificationMethod")} className="accent-orange-500" />
                Email
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="phone" {...register("verificationMethod")} className="accent-orange-500" />
                Phone
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:scale-[1.02] transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Switch to Login */}
        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <NavLink to="/login" className="text-orange-600 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  </div>
);

}
export default Signup






