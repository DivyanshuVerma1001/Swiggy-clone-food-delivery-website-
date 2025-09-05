
import {GoogleOAuthProvider, useGoogleLogin} from '@react-oauth/google'
import {useNavigate} from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { googleRegisterUser } from '../Store/authSlice';
const GoogleRegister=()=>{
    const navigate= useNavigate()
    const dispatch= useDispatch()

    const {isAuthenticated,error,loading} = useSelector((state)=>state.auth)
    useEffect(()=>{
          if(isAuthenticated){
            navigate('/')
          }
        },[isAuthenticated])
    const responseGoogle= async(authResult)=>{
        try{
            if (authResult['code'])
            console.log(authResult);
            const reply = await dispatch(googleRegisterUser(authResult['code']));
         
                
            

        }
        catch(err){
            console.log('error mil gaya google auth mea:',err )
        }
    }
    const googleLogin=useGoogleLogin({
        onSuccess:responseGoogle,
        onError:responseGoogle,
        flow:'auth-flow'
    })
    return (
  <div className="flex justify-center">
    <button
      onClick={googleLogin}
      className="flex items-center gap-3 px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition duration-200 text-gray-700 font-medium"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google Logo"
        className="w-5 h-5"
      />
      <span>Register by Google</span>
    </button>
  </div>
);

}
export default GoogleRegister;
