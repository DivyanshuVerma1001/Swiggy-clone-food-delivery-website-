import React from "react";

export default function FoodDeliveryLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-4"
      >
        {/* glowing ring */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-40 animate-ringPulse"
            style={{
              background:
                "linear-gradient(45deg,#ff7a00,#ffd24a,#3ac77a)",
              filter: "blur(18px)",
            }}
          ></div>

          {/* plate */}
          <div className="w-40 h-40 rounded-full flex items-center justify-center bg-gradient-to-br from-orange-400 via-yellow-300 to-green-400 shadow-2xl relative overflow-visible">
            {/* inner plate */}
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center relative">
              {/* spoon */}
              <div className="absolute -right-6 -top-6 transform origin-[40%_40%] animate-spinSpoon">
                {/* spoon shaft */}
                <div
                  className="w-2 h-20 rounded-full transform translate-x-2/4 translate-y-0"
                  style={{
                    background:
                      "linear-gradient(180deg,#f3f3f3,#e0e0e0)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                  }}
                ></div>
                {/* spoon bowl */}
                <div
                  className="w-8 h-6 rounded-b-full -mt-1 ml-[-6px] shadow-md"
                  style={{
                    background:
                      "linear-gradient(180deg,#f7f7f7,#e6e6e6)",
                  }}
                ></div>

                {/* food balls */}
                <div className="absolute -left-1 -bottom-6 flex items-center justify-center">
                  <div
                    className="w-3 h-3 rounded-full animate-bounceFood"
                    style={{ background: "#ff6b00" }}
                  ></div>
                  <div
                    className="w-3 h-3 rounded-full ml-1 animate-bounceFood delay-200"
                    style={{ background: "#ffd24a" }}
                  ></div>
                </div>
              </div>

              {/* center caption */}
              <div className="text-xs text-gray-500 tracking-wide text-center">
                <span className="block font-semibold">Loading menu…</span>
              </div>
            </div>
          </div>
        </div>

        {/* optional small caption */}
        <div className="text-sm text-gray-600">
          Preparing delicious options for you
        </div>
      </div>

      {/* custom animations */}
      <style>{`
        @keyframes spinSpoon {
          0% { transform: rotate(-18deg); }
          50% { transform: rotate(18deg); }
          100% { transform: rotate(-18deg); }
        }
        @keyframes bounceFood {
          0% { transform: translateY(0); opacity: 0.9; }
          50% { transform: translateY(-6px) scale(1.05); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.9; }
        }
        @keyframes ringPulse {
          0% { transform: scale(0.9); opacity: 0.35; }
          50% { transform: scale(1.06); opacity: 0.6; }
          100% { transform: scale(0.9); opacity: 0.35; }
        }

        .animate-spinSpoon { animation: spinSpoon 2.6s ease-in-out infinite; }
        .animate-bounceFood { animation: bounceFood 0.9s cubic-bezier(.2,.9,.2,1) infinite; }
        .animate-ringPulse { animation: ringPulse 2.8s ease-in-out infinite; }
        .delay-200 { animation-delay: 0.18s; }
      `}</style>
    </div>
  );
}
