import { useParams } from "react-router"
import { useState,useEffect } from "react";
import MenuCard from "./MenuCard";
import { Link } from "react-router";
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
        const [selected,setSelected]=useState(null)
        console.log(RestData)
    return(
        <div>
            <div  className="w-[60%] mx-auto mt-20">
                <Link to={`/city/delhi/${id}/search`}>
               
                <div className="w-full bg-[#02060C0D] flex items-center justify-between text-xl border rounded-2xl font-semibold  text-slate-400 py-3">
                    
                    <p className="mx-auto">Search for Dishes</p>
                    <span className="h-6 pr-10"><img className="h-6 contrast-1"src="../../assets/searchIcon.png" alt="" /></span>
                    <img src="" alt="" />
                </div>
                </Link>
            </div>
        <div className="w-[80%] mx-auto mt-20">
                     <div className="flex gap-5">
            <div className="flex items-center space-x-4">     
                <button onClick={()=>setSelected(selected==="veg"?null:"veg")} className={`w-18 h-8 flex items-center rounded-full p-2  border border-slate-400`}>
                    <div className={`w-17 h-3 flex items-center rounded-full p-1 transition duration-300 ${selected==="veg" ? "bg-green-500" : "bg-gray-300"}`}>
                    <img src="../../assets/vegSymbol.png" className={`bg-white w-6 h-6 rounded   shadow-md transform transition-transform duration-300 ${selected==="veg" ? "translate-x-7 " : "translate-x-[-4px]"}`}>
                    </img> 
                    </div>
                  
                </button>
            </div>
            <div className="flex items-center space-x-4">     
                <button onClick={()=>setSelected(selected==="nonveg"?null:"nonveg")} className={`w-18 h-8 flex items-center rounded-full p-2  border border-slate-400`}>
                    <div className={`w-17 h-3 flex items-center rounded-full p-1 transition duration-300 ${selected==="nonveg" ? "bg-red-500" : "bg-gray-300"}`}>
                    <img src="../../assets/nonvegSymbol.png" className={`bg-white w-6 h-6 rounded   shadow-md transform transition-transform duration-300 ${selected==="nonveg" ? "translate-x-7 " : "translate-x-[-4px]"}`}>
                    </img> 
                    </div>
                  
                </button>
            </div>
            </div>
        <div className="w-[80%] mx-auto mt-20">
            {
                RestData.map((menuItems)=><MenuCard key={menuItems?.card?.card?.title} foodSelected={selected} menuItems={menuItems?.card?.card} ></MenuCard>)
            }
        </div>
        </div>
        </div>
    )
}