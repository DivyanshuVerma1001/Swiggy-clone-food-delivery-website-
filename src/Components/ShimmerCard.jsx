import React from "react";

export default function ShimmerCard() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -450px 0;
          }
          100% {
            background-position: 450px 0;
          }
        }
        .shimmer {
          background: linear-gradient(
            to right,
            #e0e0e0 0%,
            #f8f8f8 50%,
            #e0e0e0 100%
          );
          background-size: 900px 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>

      <div className="w-[280px] h-[320px] rounded-2xl shadow-md bg-white overflow-hidden relative">
        {/* Image placeholder */}
        <div className="w-full h-44 rounded-xl shimmer"></div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="h-5 w-3/4 rounded-xl shimmer"></div>
          <div className="flex gap-4">
            <div className="h-4 w-14 rounded-xl shimmer"></div>
            <div className="h-4 w-24 rounded-xl shimmer"></div>
          </div>
          <div className="h-4 w-full rounded-xl shimmer"></div>
          <div className="h-4 w-1/2 rounded-xl shimmer"></div>
        </div>
      </div>
    </>
  );
}
