import DineOption from '../Components/HomePageComponents/DineOption'
import FoodOption from "../Components/HomePageComponents/FoodOptions";
import GroceryOption from "../Components/HomePageComponents/GroceryOption";
import Header from "../Components/HomePageComponents/Header";


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