import DineOption from "./DineOption";
import FoodOption from "./FoodOptions";
import GroceryOption from "./GroceryOption";
import Header from "./Header";


export default function Home(){
    return(
        <>
        <Header></Header>
        <FoodOption></FoodOption>
        <GroceryOption></GroceryOption>
        <DineOption></DineOption>
        </>
    )
}