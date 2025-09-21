import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axiosClient from "../axiosClient/axiosClient"
import { toast } from "react-toastify";

export const registerUser= createAsyncThunk(
    'auth/register',
    async (userData,{rejectWithValue})=>{
        try{
            const response = await axiosClient.post("/user/register",userData);
            console.log("register",response)
            return  response.data;
        }
        catch(error){
            console.log("error occur ",error)
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)

export const otpVerification= createAsyncThunk(
    'auth/otpVerification',
    async (userData,{rejectWithValue})=>{
        try{
            const response = await axiosClient.post("/user/otpverification",userData);
            return  response.data;
        }
        catch(error){
            console.log("error occur ",error)
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)
export const loginUser= createAsyncThunk(
    'auth/login',
    async (credentials,{rejectWithValue})=>{
        try{
            const response = await axiosClient.post('/user/login',credentials);
            return response.data;
        }
        catch(error){
            // Only send back safe, serializable info
            return rejectWithValue(
                error.response?.data?.message || error.message
            )
        }    
    }
)


export const googleLoginUser= createAsyncThunk(
    'auth/googleLogin',
    async (code,{rejectWithValue})=>{
        try{
            const response = await axiosClient.get(`/user/googleLogin?code=${code}`,);
            console.log(response)
            return response.data;
        }
        catch(error){
            // Only send back safe, serializable info
            return rejectWithValue(
                error.response?.data?.message || error.message
            )
        }    
    }
)


export const googleRegisterUser= createAsyncThunk(
    'auth/googleRegister',
    async (code,{rejectWithValue})=>{
        try{
            const response = await axiosClient.get(`/user/googleRegister?code=${code}`,);
            return response.data;
        }
        catch(error){
            // Only send back safe, serializable info
            return rejectWithValue(
                error.response?.data?.message || error.message
            )
        }    
    }
)



export const checkAuth= createAsyncThunk(
    'auth/check',
    async (_,{rejectWithValue})=>{
        try{
            const {data}=await axiosClient.get('user/check');
            return data;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)
export const verifyOtp= createAsyncThunk(
    'auth/check',
    async (_,{rejectWithValue})=>{
        try{
            const {data}=await axiosClient.get('user/verifyOtp');
            return data.user;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_,{rejectWithValue})=>{
        try{
            await axiosClient.post("/user/logout");
            return null
        }
        catch(err){
            return rejectWithValue(err)
        }
    }
)

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        isAuthenticated:false,
        loading:false,
        error:null
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
            //register user cases
            .addCase(registerUser.pending,(state)=>{
                state.loading=true;
                state.error=null
            })
            .addCase(registerUser.fulfilled,(state,action)=>{
                state.loading= false;
                
            })
            .addCase(registerUser.rejected,(state,action)=>{
                state.loading= false;
                state.error= action.payload?.message ||"something went wrong";
                state.isAuthenticated= false;
                state.user= null
                console.log("error in registreation :",state.error)
                toast.error(state.error);
            })
            //otpverification user cases
            .addCase(otpVerification.pending,(state)=>{
                state.loading=true;
                state.error=null
            })
            .addCase(otpVerification.fulfilled,(state,action)=>{
                state.loading= false;
                state.isAuthenticated= !!action.payload
                state.user= action.payload;                
            })
            .addCase(otpVerification.rejected,(state,action)=>{
                state.loading= false;
                state.error= action.payload?.message ||"something went wrong";
                state.isAuthenticated= false;
                state.user= null
            })
            //login user cases;
            .addCase(loginUser.pending,(state)=>{
                state.loading= true;
                state.error= null;
            })
            .addCase(loginUser.fulfilled,(state,action)=>{
                state.loading= false;
                state.isAuthenticated= !!action.payload
                state.user= action.payload;
            })
            .addCase(loginUser.rejected,(state,action)=>{
                state.loading= false;
                state.error= action.payload?.message|| "something went worng";
                state.isAuthenticated= false;
                state.user= null

            })
            //google login user cases;
            .addCase(googleLoginUser.pending,(state)=>{
                state.loading= true;
                state.error= null;
            })
            .addCase(googleLoginUser.fulfilled,(state,action)=>{
                state.loading= false;
                state.isAuthenticated= !!action.payload
                state.user= action.payload;
            })
            .addCase(googleLoginUser.rejected,(state,action)=>{
                state.loading= false;
                state.error= action.payload?.message|| "something went worng";
                state.isAuthenticated= false;
                state.user= null

            })
            //google register user cases;
            .addCase(googleRegisterUser.pending,(state)=>{
                state.loading= true;
                state.error= null;
            })
            .addCase(googleRegisterUser.fulfilled,(state,action)=>{
                state.loading= false;
                state.isAuthenticated= !!action.payload
                state.user= action.payload;
            })
            .addCase(googleRegisterUser.rejected,(state,action)=>{
                state.loading= false;
                state.error= action.payload?.message|| "something went worng";
                state.isAuthenticated= false;
                state.user= null
                console.log("error in google register",action.payload);
                toast.error(state.error);
            })
            


            //check user cases;
            .addCase(checkAuth.pending,(state)=>{
                state.loading= true;
                state.error= null;
            })
            .addCase(checkAuth.fulfilled,(state,action)=>{
            state.loading= false;
            if(action.payload && action.payload._id){  // or any field you expect
            state.isAuthenticated = true;
            state.user = action.payload;
            } else {
            state.isAuthenticated = false;
            state.user = null;
                }
            })

            .addCase(checkAuth.rejected,(state,action)=>{
                state.loading= false;
                state.error= action.payload?.message|| "something went worng";
                state.isAuthenticated= false;
                state.user= null

            })
            //logout user cases
            .addCase(logoutUser.pending,(state)=>{
                state.loading= true;
                state.error= null;
            })
            .addCase(logoutUser.fulfilled,(state,action)=>{
                state.loading= false;
                state.isAuthenticated= false
                state.user= null;
                state.error= null;
            })
            .addCase(logoutUser.rejected,(state,action)=>{
                state.loading= false;
                state.error= action.payload?.message|| "something went worng";
                state.isAuthenticated= false;
                state.user= null

            })
    }
    
})
export default authSlice.reducer