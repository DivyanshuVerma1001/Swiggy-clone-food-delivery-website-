export default function DineCard({ RestData }) {
  return (
    <div className="w-90 flex-none bg-white shadow-md border border-gray-200">
      {/* Image Section */}
      <div className="relative w-full h-50  ">
        <img
          className="w-full h-full object-cover"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/${RestData.info?.mediaFiles[0]?.url}`}
          alt={RestData.info?.name || "Restaurant Image"}
        />
        {/* Overlay: Name & Rating */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 flex justify-between items-center">
          <p className="text-white font-bold text-md truncate">
            {RestData.info?.name}
          </p>
          <span className="bg-green-500 text-white font-semibold px-2 py-0.5 text-sm">
            {RestData.info?.rating?.value ?? "N/A"}
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-3 space-y-2">
        <p className="text-gray-700 text-sm font-medium">
          {RestData.info?.costForTwoMsg || "Table for two at ₹999"}
        </p>

        {/* Coupons Section */}
        <div className="flex flex-wrap gap-2">
          {/* Example coupons - you can dynamically map if needed */}
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-sm">
            20% OFF
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-sm">
            Free Dessert
          </span>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-sm">
            Buy 1 Get 1
          </span>
        </div>

        <p className="text-gray-500 text-xs">
          Discounts & offers applicable. Check in app for details.
        </p>
      </div>

     
    </div>
  );
}
