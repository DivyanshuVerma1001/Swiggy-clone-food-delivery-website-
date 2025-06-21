
export default function RestCard({restInfo}){


    return (
        <div className="max-w-[280px] mb-2 transform transition duration-300 hover:scale-93">
            <img className="w-70 h-45 object-cover rounded-xl" src={"https://media-assets.swiggy.com/swiggy/image/upload/"+restInfo.info.cloudinaryImageId}></img>
            <div claseName="w-[95%] mx-auto">
                <div className="font-bold text-xl">{restInfo?.info?.name}</div>
                <div className="flex gap-2">
                    <span className="text-lg">{restInfo?.info?.avgRating}</span>
                    <span className="text-lg font-semibold">{restInfo?.info?.sla?.slaString}</span>
                </div>
                <div>{restInfo?.info?.cuisines.join(" ")}</div>

            </div>
        </div>
    )
}