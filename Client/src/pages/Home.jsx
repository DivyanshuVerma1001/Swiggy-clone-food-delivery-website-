import DineOption from '../Components/HomePageComponents/DineOption'
import FoodOption from "../Components/HomePageComponents/FoodOptions";
import GroceryOption from "../Components/HomePageComponents/GroceryOption";
import Header from "../Components/HomePageComponents/Header";
import Footer from '../Components/HomePageComponents/Footer';
import MidPageSection from '../Components/HomePageComponents/midlanding';
import HeroSection from '../Components/HomePageComponents/landing2';
import { useEffect } from 'react';

export default function Home(){
     useEffect(() => {
        document.title = "Tastify";
      }, []);
    return(
        <>
        <Header></Header>
        <FoodOption ></FoodOption>
       < HeroSection></HeroSection>
       
        <GroceryOption></GroceryOption>
        
         <MidPageSection></MidPageSection>
        <DineOption></DineOption>
        <Footer></Footer>
        </>
    )
}