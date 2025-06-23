import { useState } from "react"
import RestInfo from "./RestInfo"
export default function MenuCard({foodSelected,menuItems}){
    const[isOpen,setIsOpen]=useState(true)
    if("categories" in menuItems){
        return (
            <div className="w-full">
                <p className="font-bold text-3xl mb-5 bg-amber-600 ">{menuItems.title}</p>
                <div>
                    {
                        menuItems?.categories?.map((items)=><MenuCard key={items?.title} foodSelected={foodSelected} menuItems={items}></MenuCard>)
                    }
                </div>
            </div>
        )
    }
    if(!isOpen){
        return(
            <div className="w-full">
                <div className="flex justify-between">
                    <p className="font-bold text-3xl mb-3 ">{menuItems.title}</p>
                    <button onClick={() => setIsOpen(!isOpen)}>
                         <img
                             className={`h-9 mr-10 transform transition-transform duration-300 ${ isOpen ? "rotate-180" : "rotate-0" }`}
                                 src="../../assets/dropDown.png" alt="dropdown" />
                     </button>
                </div>
                <div className="h-3 w-full bg-[#02060C0D] mb-5"></div>
            </div>
        )   
    }
    let itemsToShow=menuItems?.itemCards;
    if(foodSelected==="veg"){
        itemsToShow=itemsToShow?.filter((food)=>"isVeg" in food?.card?.info)
    }
    if(foodSelected==="nonveg"){
        
            itemsToShow=itemsToShow?.filter((food)=>!("isVeg" in food?.card?.info))
        }
    return (
       
   
            <div className="w-full">
                <div className="flex justify-between">
                        <p className="font-bold text-3xl mb-7 ">{menuItems.title}</p>
                        <button onClick={() => setIsOpen(!isOpen)}>
                             <img className={`h-9 mr-10 transform transition-transform duration-300 ${ isOpen ? "rotate-180" : "rotate-0" }`}src="../../assets/dropDown.png" alt="dropdown"   />
                        </button>
                </div>
                {
                     itemsToShow?.map((items)=><RestInfo key={items?.card?.info?.id} isVeg={'isVeg' in items?.card?.info } restData={items?.card?.info}></RestInfo>)
                 }
            </div>
      
    )
}

