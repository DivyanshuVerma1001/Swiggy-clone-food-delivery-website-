import { useState } from "react"
import RestInfo from "./RestInfo"
export default function MenuCard({menuItems}){
    const[isOpen,setIsOpen]=useState(true)
    if("categories" in menuItems){
        return (
            <div className="w-full">
                <p className="font-bold text-3xl mb-5 bg-amber-600 ">{menuItems.title}</p>
                <div>
                    {
                        menuItems?.categories?.map((items)=><MenuCard key={items?.title} menuItems={items}></MenuCard>)
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
                    <button onClick={()=>{setIsOpen(!isOpen)}}>
                        {isOpen?<img className="h-9 mr-10" src="../../assets/dropDown.png" alt="dropdown" />:<img className="h-9 mr-10" src="../../assets/dropup.png" alt="dropup"/>}
                    </button>
                </div>
                <div className="h-3 w-full bg-[#02060C0D] mb-5"></div>
            </div>
        )   
    }
    return (
        <div className="w-full">
            <div className="flex justify-between">
                    <p className="font-bold text-3xl mb-7 ">{menuItems.title}</p>
                    <button onClick={()=>{setIsOpen(!isOpen)}}>
                        {isOpen?<img className="h-9 mr-10" src="../../assets/dropDown.png" alt="dropdown" />:<img className="h-9 mr-10" src="../../assets/dropDown.png" alt="dropup"/>}
                    </button>
                </div>
            {
                menuItems?.itemCards?.map((items)=><RestInfo key={items?.card?.info?.id} restData={items?.card?.info}></RestInfo>)
            }
        </div>
    )
}

