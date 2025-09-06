import { Link } from "react-router";

export default function FoodCard({ foodData }) {
  return (
    <div className="min-w-[160px] flex-shrink-0 text-center">
      <Link to="/restaurants">
        <img
          draggable="false"
          className="w-36 h-36 rounded-xl object-cover"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/${foodData?.imageId}`}
          alt="food"
        />
      </Link>
      <p className="mt-2 text-sm font-semibold">{foodData?.name}</p>
    </div>
  );
}
