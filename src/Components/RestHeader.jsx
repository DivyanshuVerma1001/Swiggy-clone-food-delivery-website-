import { useSelector } from "react-redux"
import { Link } from "react-router"
export default function RestHeader(){
    const counter= useSelector(state=>state.cartslice.count)
    return (
        <div  className="container flex justify-between items-center mx-auto py-4 bg-gray-200 text-5xl fixed top-0 left-0 w-full z-50">
            <div>
                <p className="bg-orange-600">Swiggy</p>
            </div>
            <Link to="/checkout">
            <div>
                <p>Cart {`[${counter}]`}</p>
            </div>
            </Link>
        </div>
    )
}