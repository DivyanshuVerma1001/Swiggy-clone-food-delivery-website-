import { useSelector } from "react-redux";
import { UserCircleIcon, HomeIcon, BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import { Link, NavLink } from "react-router";

export default function RestHeader() {
  const counter = useSelector((state) => state.cartslice.count);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#ff5200] shadow-md">
      <div className="container mx-auto flex justify-between items-center px-8 py-2">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            className="h-15 w-auto  border-white shadow-md"
            src="/assets/navLogo.png"
            alt="logo"
          />
          <span className="text-white font-bold text-3xl tracking-wide">Tastify</span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-10 text-white font-semibold text-xl">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 transition-all duration-300 ${isActive
                ? "bg-[#fd7412] text-white rounded-2xl p-2 shadow-md scale-105"
                : "hover:bg-[#fd7412] hover:text-white p-2 rounded-2xl"
              }`
            }
          >
            <HomeIcon className="w-8 h-8" />
            <span className="hidden sm:inline">Home</span>
          </NavLink>

          <NavLink
            to="/restaurants"
            className={({ isActive }) =>
              `flex items-center gap-3 transition-all duration-300 ${isActive
                ? "bg-[#fd7412] text-white rounded-2xl p-2 shadow-md scale-105"
                : "hover:bg-[#fd7412] hover:text-white p-2 rounded-2xl"
              }`
            }
          >
            <BuildingStorefrontIcon className="w-8 h-8" />
            <span className="hidden sm:inline">Restaurants</span>
          </NavLink>


          {/* Cart */}
          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              `relative flex items-center gap-3 transition-all duration-300 ${
                isActive
                  ? "bg-[#f77213] text-white rounded-2xl border-2 border-white/35 p-2 shadow-md scale-105"
                  : "hover:bg-[#fd7412] hover:text-white p-2 rounded-2xl"
              }`
            }
          >
            <img
              className="h-9 w-9"
              draggable="false"
              src="/assets/cartSymbol.png"
              alt="cart"
            />
            {counter > 0 && (
              <span className="absolute -top-1 -right-3 bg-red-600 text-white text-sm font-bold rounded-full px-2">
                {counter}
              </span>
            )}
            <span className="hidden sm:inline">Cart</span>
          </NavLink>

          {/* Auth */}
          {isAuthenticated ? (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center transition-all duration-300 ${
                  isActive
                    ? "scale-110 text-white"
                    : "hover:text-gray-200"
                }`
              }
            >
              <UserCircleIcon className="w-10 h-10" />
            </NavLink>
          ) : (
            <NavLink
              to="/signup"
              className="bg-black text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-gray-900 transition"
            >
              Sign in
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
