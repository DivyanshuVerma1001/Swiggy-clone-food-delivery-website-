import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SearchMenuCard from "../Components/SearchFoodComponents/searchFoodMenu"

export default function SearchFood() {
  const { id } = useParams();
  const [food, setFood] = useState(""); 
  const [allRestData, setAllRestData] = useState([]); 
  const [restData, setRestData] = useState([]); 

  useEffect(() => {
    async function fetchData() {
      const finalAPI = `https://cors-proxy-vercel-pied.vercel.app/api/proxy?url=${encodeURIComponent(
        `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6327&lng=77.2198&restaurantId=${id}&submitAction=ENTER`
      )}`;
      const response = await fetch(finalAPI);
      const data = await response.json();
      const tempData =
        data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
      const filterData = tempData.filter(
        (items) => "title" in items?.card?.card
      );

      setAllRestData(filterData);
      setRestData(filterData);
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!food) {
      setRestData(allRestData);
    } else {
      const query = food.toLowerCase();
      const filtered = allRestData.filter((item) => {
        const categoryTitle = item?.card?.card?.title?.toLowerCase() || "";
        const itemCards = item?.card?.card?.itemCards || [];

        const hasCategoryMatch = categoryTitle.includes(query);
        const hasItemMatch = itemCards.some((ic) =>
          ic?.card?.info?.name?.toLowerCase().includes(query)
        );

        return hasCategoryMatch || hasItemMatch;
      });
      setRestData(filtered);
    }
  }, [food, allRestData]);

  return (
    <div className= "min-h-screen">
      <div className="w-[80%] mx-auto mt-20">
        <input
          className="w-full h-15 mt-10 border-gray-200 border-2 pl-10 text-2xl bg-gray-100 rounded-2xl"
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="Search here"
        />
      </div>

      <div className="w-[80%] mx-auto mt-20">
        {restData.length === 0 ? (
          <p className="text-center text-lg">No results found</p>
        ) : (
          restData.map((menuItems) => (
            <SearchMenuCard
              key={menuItems?.card?.card?.title}
              menuItems={menuItems?.card?.card}
              query={food} // 👈 pass search query down
            />
          ))
        )}
      </div>
    </div>
  );
}
