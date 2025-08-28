import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CardSlicer"

export const store= configureStore({
    reducer:{
        cartslice:CartReducer,
    }
})