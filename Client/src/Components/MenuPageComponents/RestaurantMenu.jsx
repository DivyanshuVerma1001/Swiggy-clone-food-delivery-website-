import { useParams } from "react-router"
import { useState,useEffect } from "react";
import MenuCard from "./MenuCard";
import { Link } from "react-router";
export default function RestaurantMenu(){
    let {id}=useParams();
    const [RestData,setRestData]=useState([])
      useEffect(()=>{
            async function fetchData(){
                const proxyServer="https://cors-anywhere.herokuapp.com/"
                const proxyUrl = "http://localhost:8080/";
                const swiggyAPI=`https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6327&lng=77.2198&restaurantId=${id}&submitAction=ENTER`
                const finalAPI =`https://cors-proxy-vercel-pied.vercel.app/api/proxy?url=https%3A%2F%2Fwww.swiggy.com%2Fmapi%2Fmenu%2Fpl%3Fpage-type%3DREGULAR_MENU%26complete-menu%3Dtrue%26lat%3D28.6327%26lng%3D77.2198%26restaurantId%3D${id}%26submitAction%3DENTER`
                const response =await fetch(finalAPI )
                const data= await response.json();
                const tempData=data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards
                const filterData=tempData.filter((items)=>'title' in items?.card?.card)
                setRestData(filterData);
                console.log("data mil gaya:" , filterData)
        
            }
            fetchData();
        },[])

  // 🔹 Filter + Sort states
  const [selected, setSelected] = useState(null); // veg / nonveg
  const [priceRange, setPriceRange] = useState([100, 2000]);
  const [minRating, setMinRating] = useState(null);
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState(""); // "lowToHigh" | "highToLow"

  return (
    <div className="flex flex-row">
      {/* 🔹 Sidebar with filters */}
      <div className="bg-white/10 min-h-screen w-74 fixed left-0 top-0 p-5 pt-20 overflow-y-auto border-r-1 border-slate-400">
        <h2 className="text-2xl font-bold text-black mb-6">Filters</h2>

        {/* Veg / Nonveg Toggle */}
        <div className="flex gap-5 mt-6">
          {/* Veg Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelected(selected === "veg" ? null : "veg")}
              className="w-18 h-8 flex items-center rounded-full p-2 border border-slate-400"
            >
              <div
                className={`w-17 h-3 flex items-center rounded-full p-1 transition duration-300 ${
                  selected === "veg" ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <img
                  src="/assets/vegSymbol.png"
                  className={`bg-white w-6 h-6 rounded shadow-md transform transition-transform duration-300 ${
                    selected === "veg" ? "translate-x-7 " : "translate-x-[-4px]"
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Nonveg Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() =>
                setSelected(selected === "nonveg" ? null : "nonveg")
              }
              className="w-18 h-8 flex items-center rounded-full p-2 border border-slate-400"
            >
              <div
                className={`w-17 h-3 flex items-center rounded-full p-1 transition duration-300 ${
                  selected === "nonveg" ? "bg-red-500" : "bg-gray-300"
                }`}
              >
                <img
                  src="../../assets/nonvegSymbol.png"
                  className={`bg-white w-6 h-6 rounded shadow-md transform transition-transform duration-300 ${
                    selected === "nonveg" ? "translate-x-7 " : "translate-x-[-4px]"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6 mt-6">
          <h3 className="text-lg font-semibold mb-2">Price Range</h3>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([100, Number(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm">
            <span>₹100</span>
            <span>₹{priceRange[1]}+</span>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Rating</h3>
          <select
            className="w-full p-2 rounded-md"
            value={minRating || ""}
            onChange={(e) =>
              setMinRating(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">All</option>
            <option value="4">4★ & above</option>
            <option value="3">3★ & above</option>
          </select>
        </div>

        {/* Bestseller */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Bestsellers</h3>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={bestsellerOnly}
              onChange={(e) => setBestsellerOnly(e.target.checked)}
            />
            <span>Show only bestsellers</span>
          </label>
        </div>

        {/* 🔹 Sort By */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Sort By</h3>
          <select
            className="w-full p-2 rounded-md"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Default</option>
            <option value="lowToHigh">Price: Low → High</option>
            <option value="highToLow">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* 🔹 Main Content */}
      <div className="ml-74 w-[80%] mx-auto mt-20">
        <div className="w-[60%] mx-auto mt-20">
          <Link to={`/city/delhi/${id}/search`}>
            <div className="w-full bg-[#02060C0D] flex items-center justify-between text-xl border rounded-2xl font-semibold  text-slate-400 hover:cursor-text py-3">
              <p className="mx-auto">Search for Dishes</p>
              <span className="h-6 pr-10">
                <img
                  className="h-6 contrast-1"
                  src="/assets/searchIcon.png"
                  alt=""
                />
              </span>
            </div>
          </Link>
        </div>

        {/* Menu Items */}
        <div className="w-[80%] mx-auto mt-20">
          {RestData.map((menuItems) => (
            <MenuCard
              key={menuItems?.card?.card?.title}
              foodSelected={selected}
              priceRange={priceRange}
              minRating={minRating}
              bestsellerOnly={bestsellerOnly}
              sortOrder={sortOrder}
              menuItems={menuItems?.card?.card}
            />
          ))}
        </div>
      </div>
    </div>
  );
}