import { useSelector } from "react-redux";
import { UserCircleIcon, HomeIcon, BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router";

export default function RestHeader() {
  const counter = useSelector((state) => state.cartslice.count);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#ff5200] shadow-md">
      <div className="container mx-auto flex justify-between items-center px-8 py-2">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            className="h-12 w-auto rounded-xl border-2 border-white shadow-md"
            src="/assets/navLogo.png"
            alt="logo"
          />
          <span className="text-white font-bold text-3xl tracking-wide">Foodiez</span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-10 text-white font-semibold text-xl">
          <Link
            to="/"
            className="flex items-center gap-3 hover:text-gray-200 transition-colors"
          >
            <HomeIcon className="w-8 h-8" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <Link
            to="/restaurants"
            className="flex items-center gap-3 hover:text-gray-200 transition-colors"
          >
            <BuildingStorefrontIcon className="w-8 h-8" />
            <span className="hidden sm:inline">Restaurants</span>
          </Link>

          {/* Cart */}
          <Link to="/checkout" className="relative flex items-center gap-3 hover:text-gray-200">
            <img
              className="h-9 w-9"
              draggable="false"
              src="/assets/cartSymbol.png"
              alt="cart"
            />
            {counter > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-sm font-bold rounded-full px-2">
                {counter}
              </span>
            )}
            <span className="hidden sm:inline">Cart</span>
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="flex items-center hover:text-gray-200 transition-colors"
            >
              <UserCircleIcon className="w-10 h-10" />
            </Link>
          ) : (
            <Link
              to="/signup"
              className="bg-black text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-gray-900 transition"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
