 

 export default function DineCard({RestData}){
               
    return (
        <div className="max-w-sm flex-none">
            <div className="relative">
                <img className="w-80 h-50 object-cover" src={"https://media-assets.swiggy.com/swiggy/image/upload/"+RestData.info?.mediaFiles[0].url} alt="hello" />
                <p className="absolute bottom-4 left-4  text-white font-extrabold
text-xl backdrop-blur-md ">{RestData.info?.name}</p>
                <p className="absolute bottom-4 right-4 text-white font-extrabold text-lg ">{RestData?.info?.rating?.value   }</p>
            </div>
        </div>
          
    )
 }