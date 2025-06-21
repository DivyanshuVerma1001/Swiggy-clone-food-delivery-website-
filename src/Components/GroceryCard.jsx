export default function GroceryCard({foodData}){
    return(
        <div className="flex-none">
        <a>
        <img draggable="false" className="w-36 h-45"src={`https://media-assets.swiggy.com/swiggy/image/upload/${foodData?.imageId}`}></img>
        </a>
        <h2 className="text-center mt-3 font-semibold text-slate-700 text-base mb-2  ">{foodData?.action?.text}</h2>
        </div>
    )
}