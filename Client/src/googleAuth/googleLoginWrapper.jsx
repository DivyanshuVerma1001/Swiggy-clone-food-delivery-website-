import {GoogleOAuthProvider} from '@react-oauth/google'
import GoogleLogin from './googleLogin'

const GoogleLoginWrapper=()=>{
    return (
      <GoogleOAuthProvider clientId= "232502491402-sgh401shcf3oo91bvahc0fmt349041h3.apps.googleusercontent.com">
        <GoogleLogin></GoogleLogin>
      </GoogleOAuthProvider>
    )
  }
export default GoogleLoginWrapper