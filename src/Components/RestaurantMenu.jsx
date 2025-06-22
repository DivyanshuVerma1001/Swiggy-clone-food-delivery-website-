import { useParams } from "react-router"
import { useState,useEffect } from "react";
import MenuCard from "./MenuCard";
export default function RestaurantMenu(){
    let {id}=useParams();
    const [RestData,setRestData]=useState([])
      useEffect(()=>{
            async function fetchData(){
                const proxyServer="https://cors-anywhere.herokuapp.com/"
                const proxyUrl = "http://localhost:8080/";
                const swiggyAPI=`https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6327&lng=77.2198&restaurantId=${id}&submitAction=ENTER`
                const response =await fetch(proxyUrl+swiggyAPI )
                const data= await response.json();
                const tempData=data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards
                const filterData=tempData.filter((items)=>'title' in items?.card?.card)
                setRestData(filterData);
        
            }
            fetchData();
        },[])
        console.log(RestData)
    return(
        <div className="w-[80%] mx-auto mt-20">
            {
                RestData.map((menuItems)=><MenuCard key={menuItems?.card?.card?.title} menuItems={menuItems?.card?.card} ></MenuCard>)
            }
        </div>
    )
}