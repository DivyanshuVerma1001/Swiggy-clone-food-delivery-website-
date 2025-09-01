import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CardSlicer"
import AuthReducer from "./authSlice"
export const store= configureStore({
    reducer:{
        cartslice:CartReducer,
         auth: AuthReducer,
    }
})