
import './App.css'
import Restaurant from './Components/Restaurant'
import Home from './Components/Home'
import {BrowserRouter,Routes, Route} from "react-router"
import RestaurantMenu from './Components/RestaurantMenu'
import SearchFood from './Components/SearchFood'
import SecondaryHome from './Components/SecondaryHome'
import Login from './pages/loginPage'
import { useDispatch, useSelector} from "react-redux"
import Checkout from './Components/Checkout'
import Signup from './pages/signupPage'
import OtpVerification from './pages/otpVerificationPage'
import { checkAuth } from './Store/authSlice'
import { useEffect } from 'react'
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
      <div className="min-h-screen flex items-center justify-center">
        <span className= "loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path='/login' element ={<Login></Login>}></Route>
          <Route path ='/signup' element ={<Signup></Signup>}></Route>
          <Route path ='/otpverification/:email/:phone' element ={<OtpVerification></OtpVerification>}></Route>

          <Route element={<SecondaryHome></SecondaryHome>}>
            <Route path="/Restaurants" element={<Restaurant></Restaurant>}></Route>
            <Route path="/city/delhi/:id" element={<RestaurantMenu></RestaurantMenu>}></Route>
            <Route path="/city/delhi/:id/search" element={<SearchFood></SearchFood>}></Route>
          </Route>  
          <Route path="/checkout" element={<Checkout></Checkout>}></Route>    
        </Routes>
      </BrowserRouter>
    
       
    </>
  )
}

export default App
