import { Link } from "react-router"

export default function Header(){


    return (
        <header className="bg-[#ff5200] font-serif">
            <div className="flex justify-between container mx-auto py-8">
                <img className="w-40 h-12" src="https://res.cloudinary.com/dutdah0l9/image/upload/v1720058694/Swiggy_logo_bml6he.png" alt="" />
                 <div className=" text-white text-base font-bold flex gap-15 items-center ">
                    <a target="_blank" href="https://www.swiggy.com/corporate/">Swiggy Corporate</a>  
                    <a href="https://partner.swiggy.com/login#/swiggy">Parter with us</a>
                    <a className="border border-white py-3 px-4 rounded-2xl"target="_blank">Get the App</a>
                    <Link to ="/auth">
                    <a className="border border-black py-3 px-4 rounded-2xl bg-black">Sign in</a>
                    </Link>
                </div>   
            </div>
            <div className="pt-16 pb-8 relative ">
                <img className="h-110 w-60 absolute top-0 left-0" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png" alt="" />
                <img className="h-110 w-60 top-0 absolute right-0"src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"></img>
                <div className="max-w-[60%] container mx-auto text-center text-5xl text-white">
                    Order Food & Groceries. Discover best restaurants.Swiggy it!
                </div>
                <div className="max-w-[70%] container mx-auto flex gap-5 mt-10 items-center">
                    <input className="bg-white  w-[40%] text-2xl px-6 py-4 rounded-2xl"placeholder="Delhi , India"></input>
                    <input className="bg-white w-[55%]  text-2xl px-6 py-4 rounded-2xl"placeholder="Search for restaurants"></input>
                </div>
            </div>
            <div className="max-w-[80%] container mx-auto flex ">
                <Link className="transform transition duration-300 hover:scale-105" to="/Restaurants">
                    <img draggable="false" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/ec86a309-9b06-48e2-9adc-35753f06bc0a_Food3BU.png" alt="" />
                </Link>
                <a className="transform transition duration-300 hover:scale-105">
                    <img draggable="false"src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b5c57bbf-df54-4dad-95d1-62e3a7a8424d_IM3BU.png" alt="" />
                </a>
                <a className="transform transition duration-300 hover:scale-105">
                    <img draggable="false" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b6d9b7ab-91c7-4f72-9bf2-fcd4ceec3537_DO3BU.png" alt="" />
                </a>
            </div>
        </header>
    )
}