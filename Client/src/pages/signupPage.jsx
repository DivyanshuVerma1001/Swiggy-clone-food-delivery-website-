import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { registerUser } from '../Store/authSlice';
import OtpVerification from './otpVerificationPage';

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
    if(isAuthenticated){
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
  <>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen flex flex-col justify-center items-center max-w-xl mx-auto gap-4 p-6 shadow-xl bg-base-100 rounded-xl"
    >
      {/* First Name */}
      <div className="w-full flex flex-col">
        <label className="mb-1 text-sm font-medium">Name</label>
        <input
          {...register("name")}
          placeholder="Enter Name"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
        )}
      </div>

      {/* Email */}
      <div className="w-full flex flex-col">
        <label className="mb-1 text-sm font-medium">Email</label>
        <input
          {...register("email")}
          placeholder="Enter Email"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
        )}
      </div>

      {/* Phone */}
      <div className="w-full flex items-center gap-2">
        <span className="text-sm font-medium">+91</span>
        <input
          type="text"
          placeholder="Phone number"
          required
          {...register("phone")}
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
        />
      </div>

      {/* Password */}
      <div className="w-full flex flex-col">
        <label className="mb-1 text-sm font-medium">Password</label>
        <input
          {...register("password")}
          type="password"
          placeholder="Enter Password"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.password && (
          <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
        )}
      </div>

      {/* Verification Method */}
      <div className="w-full flex flex-col mt-2">
        <p className="mb-1 text-sm font-medium">Select verification method</p>
        <div className="flex gap-4">
          <label className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="verificationMethod"
              value="email"
              {...register("verificationMethod")}
              required
              className="accent-blue-500"
            />
            Email
          </label>
          <label className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="verificationMethod"
              value="phone"
              {...register("verificationMethod")}
              required
              className="accent-blue-500"
            />
            Phone Number
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>

      {/* Login Link */}
      <div className="text-center mt-6">
        <span className="text-sm">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-600 hover:underline">
            Login
          </NavLink>
        </span>
      </div>
    </form>
  </>
);
}
export default Signup






