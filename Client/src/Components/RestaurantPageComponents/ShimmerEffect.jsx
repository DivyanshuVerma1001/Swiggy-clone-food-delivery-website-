import ShimmerCard from "./ShimmerCard";

export default function Shimmer() {
  return (
    <div className="flex flex-wrap w-[80%] mx-auto mt-20 mb-10 gap-5">
      {Array(8).fill(0).map((_, index) => (
        <ShimmerCard key={index} />
      ))}
    </div>
  );
}
