import {createSlice} from "@reduxjs/toolkit"

const cart=createSlice({
    name:'cartSlice',
    initialState:{
        items:[]
    },
    reducers:{
        addItems:()=>{
            state.items.push({...action.payload,quantity:1})
        },
        IncrementItems:()=>{
            const element=state.items.find(item=>item.id===action.payload.id)
            element.quantity+=1;
        },
        DecrementItems:()=>{
            const element=state.items.find(item=>item.id===action.payload.id)
            if (element.quantity>1){
                element.quantity-=1;
            }
            else {
                state.items=state.items.filter(item=>items.id!=action.payload.id)
            }
        }
    }

})
export const {addItems,IncrementItems,DecrementItems}=cart.actions;
export default cart.reducer;