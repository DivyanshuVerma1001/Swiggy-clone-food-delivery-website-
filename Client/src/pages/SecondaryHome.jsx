import { Outlet } from "react-router";
import RestHeader from "../Components/RestHeader";
import Footer from "../Components/HomePageComponents/Footer";



export default function SecondaryHome(){

    return (
        <>
            <RestHeader></RestHeader>
            <div className="mt-17 px-4"> </div>
            <Outlet  ></Outlet>
            <Footer></Footer>
        </>        
    )
}