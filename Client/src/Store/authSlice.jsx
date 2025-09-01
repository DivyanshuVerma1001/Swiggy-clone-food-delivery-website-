import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axiosClient from "../axiosClient/axiosClient"

export const registerUser= createAsyncThunk(
    'auth/register',
    async (userData,{rejectWithValue})=>{
        try{
            const response = await axiosClient.post("/user/register",userData);
            return  response.data.user;
        }
        catch(error){
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)
export const loginUser= createAsyncThunk(
    'auth/login',
    async (credentials,{rejectWithValue})=>{
        try{
            const response = await axiosClient.post('/user/login',credentials);
            return response.data.user;
        }
        catch(error){
            return rejectWithValue(error)
        }
    }
)
export const checkAuth= createAsyncThunk(
    'auth/check',
    async (_,{rejectWithValue})=>{
        try{
            const {data}=await axiosClient.get('user/check');
            return data.user;
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
                state.isAuthenticated= !!action.payload;
                state.user=action.payload
            })
            .addCase(registerUser.rejected,(state,action)=>{
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
            
            //check user cases;
            .addCase(checkAuth.pending,(state)=>{
                state.loading= true;
                state.error= null;
            })
            .addCase(checkAuth.fulfilled,(state,action)=>{
                state.loading= false;
                state.isAuthenticated= !!action.payload
                state.user= action.payload;
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