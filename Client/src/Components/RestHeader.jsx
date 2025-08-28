import { useSelector } from "react-redux"
import { Link } from "react-router"


export default function RestHeader(){
    const counter= useSelector(state=>state.cartslice.count)
    return (
        <div  className=" flex justify-between items-center  py-1 bg-[#ff5200] text-5xl fixed top-0 left-0 w-full z-50">
            <Link to="/">
            <div>
                <img className="bg-orange-600 h-15 rounded-xl border-white border-2 ml-5" src="/assets/navLogo.png"></img>
            </div>
            </Link>
            <Link to="/checkout">
                <div className="flex flex-col items-center mr-10">
                    <div className="relative">
                        <img className="h-10" draggable="false" src="/assets/cartSymbol.png" alt="cart" />
                            <p className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                                {counter}
                            </p>
                    </div>
                    <span className="text-white text-xl mt-[-12px]">Cart</span>
                </div>

            </Link> 
        </div>
    )
}