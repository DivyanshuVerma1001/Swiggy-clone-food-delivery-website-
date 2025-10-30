import { useState } from "react";
import { addItems, IncrementItems, DecrementItems } from "../../Store/CardSlicer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { highlightText } from "./highlight";

export default function RestInfo({ restData, isVeg, query }) {
  const navigate = useNavigate();
    const [showFullDesc, setShowFullDesc] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const items = useSelector((state) => state.cartslice.items);
  const element = items.find((item) => item.id === restData.id);
  const count = element ? element.quantity : 0;
  const dispatch = useDispatch();

  function handleAdditems() {
    if (!isAuthenticated) {
      navigate("/login");
    }
    dispatch(addItems(restData));
  }
  function handleIncrementItems() {
    if (!isAuthenticated) {
      navigate("/login");
    }
    dispatch(IncrementItems(restData));
  }
  function handleDecrementItems() {
    if (!isAuthenticated) {
      navigate("/login");
    }
    dispatch(DecrementItems(restData));
  }

  return (
    <>
      <div className="flex w-full justify-between mb-2 pb-5 mt-3 px-2">
        <div className="w-[70%]">
          <p className="text-2xl text-slate-800 font-semibold mb-2">
            {highlightText(restData?.name || "", query)}
          </p>
          <p>
            <img
              className="h-5"
              src={isVeg ? "../../assets/vegSymbol.png" : "../../assets/nonvegSymbol.png"}
              alt=""
            />
          </p>
          <p className="text-xl">₹ {restData?.price / 100}</p>
          <span className="text-green-700 font-bold ">
            {restData?.ratings?.aggregatedRating?.rating}
          </span>
          <span className=" text-gray-600">
            {"[" + restData?.ratings?.aggregatedRating?.ratingCountV2 + "]"}
          </span>
            <div className= "flex items-baseline">
          {/* ✅ Description with "more/less" */}
          <p
            className={`text-gray-600 ${
              showFullDesc ? "" : "truncate max-w-[90%]"
            }`}
          >
            {restData?.description}
          </p>
          {restData?.description?.length > 70 && (
            <button
              className="text-green-600 cursor-pointer font-semibold mt-1"
              onClick={() => setShowFullDesc(!showFullDesc)}
            >
              {showFullDesc ? "" : "more"}
            </button>
          )}
          </div>
                  </div>

        <div className="w-[20%] relative h-36">
          <img
            draggable="false"
            className="w-full rounded-3xl h-36 object-cover"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/" +
              restData?.imageId
            }
            alt=""
          />
          {count === 0 ? (
            <button
              onClick={handleAdditems}
              className="absolute text-green-600 text-xl font-bold px-4 py-2 shadow-2xl border rounded-xl bg-white bottom-[-19px] left-1/2 -translate-x-1/2"
            >
              ADD
            </button>
          ) : (
            <div className="absolute flex items-center text-green-600 font-bold border-2 rounded-xl bg-white bottom-[-19px] left-1/2 -translate-x-1/2">
              <button
                className="text-3xl px-3 py-1  hover:bg-slate-100 rounded-l-xl hover:border-r-2 hover:border-slate-200"
                onClick={handleDecrementItems}
              >
                -
              </button>
              <span className="px-2 text-2xl">{count}</span>
              <button
                className="text-2xl px-3 py-1 h-full hover:bg-slate-100 rounded-r-xl"
                onClick={handleIncrementItems}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
      <hr className="mb-6 mt-2"></hr>
    </>
  );
}
