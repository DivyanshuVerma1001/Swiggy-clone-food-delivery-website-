import { useParams } from "react-router"
import { useState,useEffect } from "react";

export default function RestaurantMenu(){
    let {id}=useParams();
    const [RestData,setRestData]=useState(null)
      useEffect(()=>{
            async function fetchData(){
                const proxyServer="https://cors-anywhere.herokuapp.com/"
                const proxyUrl = "http://localhost:8080/";
                const swiggyAPI=`https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6327&lng=77.2198&restaurantId=${id}&submitAction=ENTER`
                const response =await fetch(proxyUrl+swiggyAPI )
                const data= await response.json();
                setRestData(data);
        
            }
            fetchData();
        },[])
        console.log(RestData)
    return(
        <>
            <h1>hello world </h1>
            <h2>{id}</h2>
        </>
    )
}