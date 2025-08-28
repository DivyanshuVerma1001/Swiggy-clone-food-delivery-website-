import { Outlet } from "react-router";
import RestHeader from "./RestHeader";



export default function SecondaryHome(){

    return (
        <>
            <RestHeader></RestHeader>
            <div className="mt-24 px-4"> </div>
            <Outlet  ></Outlet>
        </>        
    )
}