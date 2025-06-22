import { useEffect, useState } from "react"
import RestCard  from "./RestCard"
import ShimmerEffect from "./ShimmerEffect"
export default function Restaurant(){
    const [RestData,setRestData]= useState([])
    useEffect(()=>{
        async function fetchData(){
            const proxyServer="https://cors-anywhere.herokuapp.com/"
            const proxyUrl = "http://localhost:8080/";
            const swiggyAPI="https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=28.63270&lng=77.21980&carousel=true&third_party_vendor=1"
            const response =await fetch(proxyUrl+swiggyAPI )
            const data= await response.json();
            setRestData(data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
    
        }
        fetchData();
    },[])
    console.log(RestData)
    if (RestData.length==0){
        return (
            <ShimmerEffect></ShimmerEffect>
        )
    }
    return (
        <div className="flex flex-wrap w-[80%] mx-auto mt-20 gap-5">
            {
                RestData.map((restInfo)=><RestCard key={restInfo.info.id} restInfo={restInfo}></RestCard>)
            }

        </div>

    )
}