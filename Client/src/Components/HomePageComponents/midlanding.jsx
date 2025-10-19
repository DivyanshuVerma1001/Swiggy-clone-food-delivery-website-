import { useState, useEffect, useRef } from 'react';
import { Flame, Leaf, Star, Zap } from 'lucide-react';

export default function MidPageSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStat, setHoveredStat] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex justify-center py-5 md:py-10 bg-white">
      <div ref={sectionRef} className="w-[85%] relative">
        {/* Main Container */}
        <div className="relative h-[50vh] bg-gradient-to-br from-orange-50 via-white to-red-50 rounded-3xl overflow-hidden shadow-2xl border border-orange-100">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20 -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-200 to-orange-200 rounded-full blur-3xl opacity-20 -ml-40 -mb-40" />

          {/* Content Wrapper */}
          <div className="relative w-full h-full flex flex-col md:flex-row items-stretch">
            {/* Left Side - Creative Image Section */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden group">
              {/* Floating Badge */}
              <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg flex items-center gap-2 group-hover:scale-110 transition-transform duration-300">
                <Flame className="w-4 h-4 text-red-500" />
                <span className="text-xs font-bold text-gray-900">HOT DEAL</span>
              </div>

              {/* Image Container with Creative Frame */}
              <div className="w-full h-full relative">
                <img
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=500&fit=crop"
                  alt="Premium Combo Meal"
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isVisible ? 'scale-100' : 'scale-110'
                  } group-hover:scale-125`}
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-orange-400 opacity-40 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-red-400 opacity-40 group-hover:opacity-100 transition-opacity" />

                {/* Floating Stats */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                    <span className="font-bold text-gray-900">4.8</span>
                    <span className="text-xs text-gray-600">(2.4k+)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Premium Content */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-between px-6 md:px-12 py-8 md:py-10">
              {/* Top Section */}
              <div>
                {/* Badge */}
                <div
                  className={`mb-4 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 -translate-y-0' : 'opacity-0 -translate-y-4'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      <Zap className="w-3 h-3" />
                      LIMITED TIME
                    </div>
                  </div>
                </div>

                {/* Headline */}
                <div
                  className={`transition-all duration-1000 delay-100 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                >
                  <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 leading-tight mb-3">
                    Feast Like Never Before
                  </h2>
                </div>

                {/* Description */}
                <div
                  className={`transition-all duration-1000 delay-200 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                >
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed font-medium">
                    Flame-grilled perfection meets fresh farm ingredients. Every bite is a celebration of taste.
                  </p>
                </div>
              </div>

              {/* Middle Section - Feature Pills */}
              <div
                className={`flex flex-wrap gap-3 my-4 transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex items-center gap-2 bg-orange-100 px-3 py-2 rounded-lg">
                  <Flame className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-semibold text-orange-900">Fresh & Hot</span>
                </div>
                <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg">
                  <Leaf className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-900">100% Pure</span>
                </div>
              </div>

              {/* Bottom Section - CTA & Info */}
              <div
                className={`transition-all duration-1000 delay-400 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {/* CTA Button - Creative Design */}
                <button className="group/btn relative w-full md:w-auto px-8 py-4 mb-4 overflow-hidden rounded-xl font-bold text-lg text-white transition-all duration-300">
                  {/* Button Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 transition-all duration-300 group-hover/btn:shadow-2xl group-hover/btn:shadow-orange-500/50" />

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/btn:opacity-30 -translate-x-full group-hover/btn:translate-x-full transition-all duration-500" />

                  {/* Button Text */}
                  <span className="relative flex items-center justify-center gap-2">
                    Order Now & Save 20%
                    <Flame className="w-5 h-5" />
                  </span>
                </button>

                {/* Quick Info */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-gray-700 font-medium">20-30 mins</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-gray-700 font-medium">Free Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-red-500 to-green-400" />
        </div>

        {/* Animated Counter Badge - Below */}
        <div
          className={`mt-8 flex gap-4 justify-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          {[
            { label: 'Orders Today', value: '2,847', icon: '🔥' },
            { label: 'Happy Customers', value: '98%', icon: '😋' },
            { label: 'Delivery Success', value: '99.5%', icon: '✅' },
          ].map((stat, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredStat(idx)}
              onMouseLeave={() => setHoveredStat(null)}
              className={`px-6 py-3 rounded-xl bg-gradient-to-br from-white to-gray-50 border-2 cursor-pointer transition-all duration-300 ${
                hoveredStat === idx
                  ? 'border-orange-500 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className="text-center">
                <span className="text-2xl">{stat.icon}</span>
                <p className="font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}