import { loginUser ,registerUser} from "../Store/authSlice"
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {useForm} from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router'

import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'



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
    const reply = await dispatch(loginUser(data));
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

    const submittedData= (data)=>{
        console.log(data)
    }


    return (
  <>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen flex flex-col justify-center items-center max-w-xl mx-auto gap-4 p-6 shadow-xl bg-base-100 rounded-xl"
    >

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          {...register("email")}
          placeholder="Enter Email"
          autoFocus
          className={`input input-bordered w-full ${errors.email && 'input-error'}`}
        />
        {errors.email && (
          <span className="text-error text-sm mt-1">{errors.email.message}</span>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          {...register("password")}
          type="password"
          placeholder="Enter Password"
        className={`input input-bordered w-full ${errors.password && 'input-error'}`}
        />
        {errors.password && (
          <span className="text-error text-sm mt-1">{errors.password.message}</span>
        )}
      </div>
      <div className= "text-center mt-6">
        <span className= "text-sm">
          <NavLink to ='/forgotPassword' className= "link link-primary ">forgot password ?</NavLink>
        </span>
      </div>

      <button type="submit" disabled={loading} className={`btn btn-primary w-full mt-4 ${loading? 'loading':''}`}>
        {loading?"Logging in...":"Log in"}
      </button>
      <div className= "text-center mt-6">
        <span className= "text-sm">Already have an account?{' '}
          <NavLink to ='/signup' className= "link link-primary ">Sign up</NavLink>
        </span>
      </div>
    </form>
  </>
);

}
export default Login