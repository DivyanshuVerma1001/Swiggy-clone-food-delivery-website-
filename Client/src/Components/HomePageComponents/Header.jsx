import { Link } from "react-router";
import { motion } from "framer-motion";
import TypingText from "./AnimatedTagLine";
import { useSelector } from "react-redux";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="min-h-screen bg-gradient-to-br from-[#ff5200] via-[#f75402] to-[#ff5200] font-serif overflow-hidden relative">
      {/* Navbar */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex justify-between container mx-auto py-8"
      >
        {/* Logo Section */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center text-white text-4xl font-sans font-bold gap-3"
        >
          <img
            className="w-28 h-24 select-none"
            draggable="false"
            src="/assets/logo.png"
            alt="logo"
          />
          <h1 className="tracking-wide drop-shadow-lg">Tastify</h1>
        </motion.div>

        {/* Nav Links */}
        <div className="text-white font-bold flex gap-12 items-center text-[20px]">
          <a
            onClick={() =>
              document
                .getElementById("foodOption")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="cursor-pointer hover:text-yellow-200 transition"
          >
            Best Deals
          </a>
          <a
            onClick={() =>
              document
                .getElementById("groceryOption")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="cursor-pointer transition"
          >
            Popular Picks
          </a>
          <a
            href="https://divyanshu-verma.me"
            target="_blank"
            rel="noreferrer"
            className="border border-white py-3 px-4 rounded-2xl hover:bg-orange-500 transition-all duration-300"
          >
            Contact Us
          </a>

          {isAuthenticated ? (
            <Link to="/profile" className="flex items-center gap-2">
              <UserCircleIcon className="w-12 h-12 text-white transition duration-200" />
            </Link>
          ) : (
            <Link to="/signup">
              <p className="border border-black py-3 px-4 rounded-2xl bg-black hover:bg-gray-900 transition">
                Sign in
              </p>
            </Link>
          )}
        </div>
      </motion.div>

      {/* Hero Section */}
      <div className="pt-16 pb-8 relative">
        {/* Left Image */}
        <motion.img
          initial={{ x: -150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          draggable="false"
          className="h-[28rem] w-60 absolute top-0 left-0"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
          alt="veggies"
        />

        {/* Right Image */}
        <motion.img
          initial={{ x: 150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          draggable="false"
          className="h-[28rem] w-60 top-0 absolute right-0"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
          alt="sushi"
        />

        {/* Typing Text Animation */}
        <div className="relative z-10">
          <TypingText />
        </div>

        {/* Hero Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-[60%] mt-10 container mx-auto text-center text-5xl text-white font-semibold tracking-wide drop-shadow-lg"
        >
          Discover Best Restaurants!
        </motion.div>
      </div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="max-w-[80%] container mx-auto flex items-center justify-center"
      >
        <div className="mt-10 flex gap-10">
          {/* Button 1 */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-white bg-black/80 rounded-full hover:bg-black transition-all duration-300 hover:shadow-2xl backdrop-blur-sm border-2 border-white/20 hover:border-white/40"
              to="/Restaurants"
            >
              <span className="relative z-10">Start Ordering</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg
                className="ml-3 w-9 h-9 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </motion.div>

          {/* Button 2 */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-white bg-green-900 rounded-full hover:bg-green-800 transition-all duration-300 hover:shadow-2xl backdrop-blur-sm border-2 border-white/20 hover:border-white/40"
              to="/Restaurants"
            >
              <span className="relative z-10">Explore Restaurants</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg
                className="ml-3 w-9 h-9 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
}
