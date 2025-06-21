export default function FoodCard({foodData}){
    return(
        <>
        <a href={foodData?.action?.link}>
        <img draggable="false" className="w-36 h-45"src={`https://media-assets.swiggy.com/swiggy/image/upload/${foodData?.imageId}`}></img>
        </a>
        
        </>
    )
}