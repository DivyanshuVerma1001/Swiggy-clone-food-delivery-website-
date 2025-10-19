import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, MapPin, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Floating animation variants
  const floatingItems = [
    { id: 1, emoji: '🍔', top: '5%', left: '10%', delay: '0s', size: 'w-20 h-20' },
    { id: 2, emoji: '🍕', top: '15%', right: '8%', delay: '0.3s', size: 'w-24 h-24' },
    { id: 3, emoji: '🥜', top: '45%', left: '5%', delay: '0.6s', size: 'w-16 h-16' },
    { id: 4, emoji: '🍗', top: '50%', right: '10%', delay: '0.2s', size: 'w-20 h-20' },
    { id: 5, emoji: '🌮', top: '75%', left: '15%', delay: '0.5s', size: 'w-18 h-18' },
    { id: 6, emoji: '🍝', top: '70%', right: '5%', delay: '0.4s', size: 'w-20 h-20' },
  ];

  return (
    <div ref={sectionRef} className="w-full min-h-screen bg-gradient-to-b from-white via-orange-50 to-white relative overflow-hidden py-20">
      {/* Decorative SVG Waves */}
      <svg className="absolute top-0 left-0 w-full opacity-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,30 Q300,60 600,30 T1200,30 L1200,120 L0,120 Z" fill="url(#gradient1)" />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF8A3D" />
            <stop offset="50%" stopColor="#FF4444" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Food Items */}
      {floatingItems.map((item) => (
        <div
          key={item.id}
          className={`absolute ${item.size} opacity-0 pointer-events-none`}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            animation: isVisible ? `float 6s ease-in-out infinite` : 'none',
            animationDelay: item.delay,
            opacity: isVisible ? 0.9 : 0,
            transition: 'opacity 1s ease-out',
          }}
        >
          <div className="text-5xl md:text-6xl filter drop-shadow-lg">{item.emoji}</div>
        </div>
      ))}

      {/* Floating decorative circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/3 w-36 h-36 bg-green-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-600">
              Better food for
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600">
              more people
            </span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
            For over a decade, we've enabled our customers to discover new tastes, delivered right to their doorstep. Fresh, fast, and always delicious.
          </p>
        </div>

        {/* Stats Section */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16">
            {/* Stat 1 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-orange-100 hover:border-orange-300">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                  3M+
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <ShoppingBag className="w-4 h-4 text-orange-500" />
                  <p className="text-sm md:text-base font-bold text-gray-900">Restaurants</p>
                </div>
                <p className="text-xs text-gray-600">Partner with us</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-red-100 hover:border-red-300">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  800+
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <p className="text-sm md:text-base font-bold text-gray-900">Cities</p>
                </div>
                <p className="text-xs text-gray-600">Available now</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-green-100 hover:border-green-300">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
                  3B+
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <p className="text-sm md:text-base font-bold text-gray-900">Orders</p>
                </div>
                <p className="text-xs text-gray-600">Delivered</p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-orange-100 hover:border-orange-300">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  98%
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <span className="text-xl">⭐</span>
                  <p className="text-sm md:text-base font-bold text-gray-900">Ratings</p>
                </div>
                <p className="text-xs text-gray-600">Customer satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div
          className={`text-center mt-20 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button className="group relative px-10 py-5 text-lg font-bold text-white rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-orange-500/50" />

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-40 -translate-x-full group-hover:translate-x-full transition-all duration-700" />

            {/* Text */}
            <span className="relative flex items-center justify-center gap-2">
              Order Now & Get 20% Off
              <span className="text-xl">🔥</span>
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Wave */}
      <svg className="absolute bottom-0 left-0 w-full opacity-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,30 Q300,60 600,30 T1200,30 L1200,0 L0,0 Z" fill="url(#gradient2)" />
        <defs>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="50%" stopColor="#FF4444" />
            <stop offset="100%" stopColor="#FF8A3D" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(2deg); }
          50% { transform: translateY(-40px) rotate(-2deg); }
          75% { transform: translateY(-20px) rotate(2deg); }
        }
      `}</style>
    </div>
  );
}