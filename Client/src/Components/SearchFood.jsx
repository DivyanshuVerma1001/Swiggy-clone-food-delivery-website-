import { useState } from "react"
import { useParams } from "react-router"

export default function SearchFood(){
    const{id}=useParams()
    const[food,setFood]=useState("")
    return (
        <div className="w-[80%] mx-auto mt-20">
            <input className="w-full pl-10 text-2xl bg-gray-100" type="text" onChange={(e)=>setFood(e.target.value)} placeholder="Search here" />
        </div>
    )
}