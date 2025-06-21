import { dineoutRestaurants } from "../Utils/dineData";
import DineCard from "./DineCard";
export default function DineOption(){


    return (
        <div className="w-[80%] mx-auto mt-20">
            <p className="text-2xl font-bold">Discover best restaurant on Dineout</p>
            <div className="flex flex-nowrap overflow-x-auto mt-5 gap-4">
                {
                    dineoutRestaurants.map((RestData)=><DineCard key={RestData?.info?.id} RestData={RestData}></DineCard>)
                }
            </div>
        </div>
    )
}