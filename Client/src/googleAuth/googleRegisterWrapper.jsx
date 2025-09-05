import {GoogleOAuthProvider} from '@react-oauth/google'
import GoogleRegister from './googleRegisterUser'

const GoogleRegisterWrapper=()=>{
    return (
      <GoogleOAuthProvider clientId= "232502491402-sgh401shcf3oo91bvahc0fmt349041h3.apps.googleusercontent.com">
        <GoogleRegister></GoogleRegister>
      </GoogleOAuthProvider>
    )
  }
export default GoogleRegisterWrapper