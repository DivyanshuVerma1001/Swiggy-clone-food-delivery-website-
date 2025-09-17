import { useEffect, useState } from "react"
import RestCard  from "./RestCard"
import ShimmerEffect from "./ShimmerEffect"
export default function Restaurant(){
    const [RestData,setRestData]= useState([])
    useEffect(()=>{
        async function fetchData(){
            const proxyServer="https://cors-anywhere.herokuapp.com/"
            const proxyUrl = "http://localhost:8080/";
            const vercel ="https://cors-proxy-vercel-pied.vercel.app/api/proxy?url="
            const finalAPI="https://cors-proxy-vercel-pied.vercel.app/api/proxy?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D28.6327%26lng%3D77.2198%26is-seo-homepage-enabled%3Dtrue%26page_type%3DDESKTOP_WEB_LISTING"
            const newswiggyAPI="https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6327&lng=77.2198&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
            const swiggyAPI="https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=28.63270&lng=77.21980&carousel=true&third_party_vendor=1"
            const response =await fetch(finalAPI)
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
        <div className="flex flex-wrap w-[80%] mx-auto mt-20 gap-5 pb-15">
            {
                RestData.map((restInfo)=><RestCard key={restInfo.info.id} restInfo={restInfo}></RestCard>)
            }

        </div>

    )
}