

export default function RestInfo({restData}){

    return (
        <>
        <div className="flex w-full justify-between mb-2 pb-2  mt-3 ">
            <div className="w-[70%]">
                <p className="text-2xl text-slate-800 font-semibold mb-2">{restData?.name}</p>
                <p className="text-xl">{"₹"+restData?.defaultPrice/100}</p>
                <span className="text-green-700 font-bold ">{restData?.ratings?.aggregatedRating?.rating}</span>
                <span>{"["+restData?.ratings?.aggregatedRating?.ratingCountV2 +"]"}</span>
                <p>{restData?.description}</p>

            </div>
            <div className="w-[20%] relative h-36">
                <img draggable="false" className="w-full  rounded-3xl h-36 object-cover"src={"https://media-assets.swiggy.com/swiggy/image/upload/"+restData?.imageId} alt="" />
                <button className="absolute  text-green-600 font-bold px-4 py-2 border-2 rounded-xl bg-white bottom-[-8px] left-20">ADD</button>
            </div>
        </div>
        <hr className="mb-6 mt-2"></hr>
        </>
    )
}