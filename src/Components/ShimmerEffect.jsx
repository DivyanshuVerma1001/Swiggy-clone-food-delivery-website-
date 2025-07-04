import ShimmerCard from "./shimmerCard";

export default function Shimmer() {
  return (
    <div className="flex flex-wrap w-[80%] mx-auto mt-20 gap-5">
      {Array(8).fill(0).map((_, index) => (
        <ShimmerCard key={index} />
      ))}
    </div>
  );
}
