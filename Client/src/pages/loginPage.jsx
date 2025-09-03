import { loginUser ,registerUser} from "../Store/authSlice"
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {useForm} from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router'

import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'


import axiosClient from '../axiosClient/axiosClient'

const signupSchema= z.object({
    emailId:z.string().email(),
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
        // const response = await axiosClient("/user/register")
        // console.log(response)
      dispatch(loginUser(data))
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
          {...register("emailId")}
          placeholder="Enter Email"
          autoFocus
          className={`input input-bordered w-full ${errors.emailId && 'input-error'}`}
        />
        {errors.emailId && (
          <span className="text-error text-sm mt-1">{errors.emailId.message}</span>
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