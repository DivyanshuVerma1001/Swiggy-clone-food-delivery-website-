
import './App.css'
import Restaurant from './Components/RestaurantPageComponents/Restaurant'
import Home from './pages/Home'
import { ToastContainer } from "react-toastify";
import {BrowserRouter,Routes, Route, Navigate} from "react-router"
import RestaurantMenu from './Components/MenuPageComponents/RestaurantMenu'
import SearchFood from './Components/SearchFood'
import SecondaryHome from './pages/SecondaryHome'
import Login from './pages/AuthPages/loginPage'
import { useDispatch, useSelector} from "react-redux"
import Checkout from './pages/Checkout'
import Signup from './pages/AuthPages/signupPage'
import OtpVerification from './pages/AuthPages/otpVerificationPage';
import { checkAuth } from './Store/authSlice'
import { useEffect } from 'react'
import ForgotPassword from './pages/AuthPages/forgotPassword';
import ResetPassword from './pages/AuthPages/resetPassword';
import FoodDeliveryLoader from './Components/FoodDeliveryLoader';

function App() {
   const {isAuthenticated,loading,user} = useSelector((state)=>state.auth)
  console.log(user)
  console.log("authenticated",isAuthenticated)
  const dispatch= useDispatch()
  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])
  if(loading){
    return (
      <FoodDeliveryLoader/>
    )
  }

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path='/login' element ={isAuthenticated?<Navigate to="/"/>:<Login></Login>}></Route>
          <Route path ='/signup' element ={isAuthenticated?<Navigate to="/"/>:<Signup></Signup>}></Route>
          <Route path ='/otpverification/:email/:phone' element ={<OtpVerification></OtpVerification>}></Route>
          <Route path ='/forgotPassword' element ={<ForgotPassword></ForgotPassword>}></Route>
          <Route path ='/resetPassword/:token' element ={<ResetPassword></ResetPassword>}></Route>
          
          <Route element={<SecondaryHome></SecondaryHome>}>
            <Route path="/restaurants" element={<Restaurant></Restaurant>}></Route>
            <Route path="/city/delhi/:id" element={<RestaurantMenu></RestaurantMenu>}></Route>
            <Route path="/city/delhi/:id/search" element={<SearchFood></SearchFood>}></Route>
          </Route>  
          <Route path="/checkout" element={<Checkout></Checkout>}></Route> 
          
        </Routes>
         <ToastContainer theme="colored"/>   
      </BrowserRouter>
    
       
    </>
  )
}

export default App
