import {createSlice} from "@reduxjs/toolkit"

const cart=createSlice({
    name:'cartSlice',
    initialState:{
        items:[],
        count:0,
    },
    reducers:{
        addItems:(state,action)=>{
            console.log("this is cart slice :" , state.items);
            console.log("this is action.payload", action.payload);
            state.items.push({...action.payload,quantity:1})
            state.count++
        },
        IncrementItems:(state,action)=>{
            const element=state.items.find(item=>item.id===action.payload.id)
            console.log("this is element ",element)
            element.quantity+=1;
            
        },
        DecrementItems:(state,action)=>{
            const element=state.items.find(item=>item.id===action.payload.id)
            if (element.quantity>1){
                element.quantity-=1;
               
            }
            else {
                state.items=state.items.filter(items=>items.id!=action.payload.id)
                state.count--
            }
        }
    }

})
export const {addItems,IncrementItems,DecrementItems}=cart.actions;
export default cart.reducer;