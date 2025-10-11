import { Link } from "react-router"
import TypingText from "./AnimatedTagLine"
import { useSelector } from "react-redux"
import { UserCircleIcon } from "@heroicons/react/24/solid"; 
export default function Header(){
    const {isAuthenticated}= useSelector(state=>state.auth)

    return (
        <header className="min-h-screen bg-gradient-to-br from-[#ff5200] via-[rgb(247,84,2)] to-[#ff5200] font-serif">
            <div className="flex justify-between container mx-auto py-8">
                <div className="flex items-center text-white text-4xl  font-sans font-bold ">
                <img className="w-30 h-25" draggable="false" src="/assets/logo.png" alt="logo" />
                <h1>Tastify</h1>
                </div>
                 <div className=" text-white  font-bold flex gap-15 items-center text-[20px] ">
                    <a target="_blank" href="https://www.swiggy.com/corporate/">Best Deals</a>  
                    <a href="https://partner.swiggy.com/login#/swiggy">Popular Picks </a>
                    <a href="https://divyanshu-verma.me" className="border border-white py-3 px-4 rounded-2xl"target="_blank">Contact us</a>
                    {
                        isAuthenticated?
                        <Link to="/profile" className="flex items-center gap-2">
                                <UserCircleIcon className="w-13 h-13 text-white hover:text-[#f8f8f8]  transition-colors duration-200" />
                        </Link>
                        :
                        <Link to ="/signup">
                            <p className="border border-black py-3 px-4 rounded-2xl bg-black">Sign in</p>
                        </Link>
                    }
                    
                </div>   
            </div>
            
            <div className="pt-16 pb-8 relative ">
                
                <img draggable="false" className="h-110 w-60 absolute top-0 left-0" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png" alt="" />
                <img draggable="false" className="h-110 w-60 top-0 absolute right-0"src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"></img>
                {<TypingText></TypingText>}
                <div className="max-w-[60%] mt-10 container mx-auto text-center text-5xl text-white">
                    Discover best restaurants!
                </div>
                
            </div>
            <div className="max-w-[80%] container mx-auto flex item-center justify-center">
                
                 {/* CTA Button */}
                <div className={` mt-10 duration-1500 delay-1000 flex gap-20 `}>
                    <Link 
                        className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-white bg-black/80 rounded-full hover:bg-black transition-all duration-300 hover:scale-102 transform hover:shadow-2xl backdrop-blur-sm border-2 border-white/20 hover:border-white/40" 
                        to="/Restaurants"
                    >
                        <span className="relative z-10">Start Ordering</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <svg 
                            className="ml-3 w-9 h-9 group-hover:translate-x-1 transition-transform duration-300 " 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                    <Link 
                        className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-white bg-green-900 rounded-full hover:bg-green-900 transition-all duration-300 hover:scale-102 transform hover:shadow-2xl backdrop-blur-sm border-2 border-white/20 hover:border-white/40" 
                        to="/Restaurants"
                    >
                        <span className="relative z-10">Explore Restaurants</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <svg 
                            className="ml-3 w-9 h-9 group-hover:translate-x-1 transition-transform duration-300 " 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </header>
    )
}