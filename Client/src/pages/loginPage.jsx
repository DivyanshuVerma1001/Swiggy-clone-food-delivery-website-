import { useSelector } from "react-redux"
import { loginUser ,registerUser} from "../Store/authSlice"
import { useEffect } from "react";
import { useNavigate } from "react-router";
const Login= ()=>{
    const navigate= useNavigate();
    const {isAuthenticated,error,loading}= useSelector(state=>state.auth);
    useEffect(()=>{
        if(isAuthenticated){
            navigate('/')
        }
    },[isAuthenticated])
    return (
        <>
        this login page 
        </>
    )
}
export default Login