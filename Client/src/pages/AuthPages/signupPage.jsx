import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { useEffect } from "react";
import { registerUser } from "../../Store/authSlice";
import OtpVerification from "./otpVerificationPage";
import GoogleRegisterWrapper from "../../googleAuth/googleRegisterWrapper";

// Schema validation for signup
const signupSchema = z.object({
  name: z.string().min(3, "Name should contain at least 3 characters"),
  email: z.string().email(),
  password: z.string().min(8, "Password should contain at least 8 characters"),
  phone: z.string().min(10, "Phone number should have 10 digits"),
  verificationMethod: z.enum(["email", "phone"]),
});

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && !window.location.pathname.includes("otpverification")) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const onSubmit = async (data) => {
    try {
      const reply = await dispatch(registerUser(data));
      if (reply.payload.success) {
        navigate(`/otpverification/${data.email}/${data.phone}`);
      }
    } catch (err) {
      console.error("Error in registerUser:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-200 via-orange-100 to-red-100 px-4">
      <div className="flex w-full max-w-6xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* Left side illustration */}
        <div className="hidden md:flex w-1/2 bg-[url('/food-bg.jpg')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold drop-shadow-lg">Fresh Meals, Fast Delivery 🍴</h2>
            <p className="mt-2 text-sm opacity-90">
              Order your favorites & track them in real time!
            </p>
          </div>
        </div>

        {/* Right side form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-2">Create Account</h2>
          <p className="text-sm text-gray-500 mb-8">
            Sign up and enjoy quick, delicious meals 🚀
          </p>

          <GoogleRegisterWrapper />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input
                {...register("name")}
                placeholder="John Doe"
                className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all duration-200 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="example@email.com"
                className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all duration-200 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-1">Phone</label>
              <div className="flex">
                <span className="px-4 py-3 border rounded-l-xl bg-gray-100 text-gray-600 text-sm">
                  +91
                </span>
                <input
                  {...register("phone")}
                  placeholder="9876543210"
                  className="flex-1 px-4 py-3 border-t border-b border-r rounded-r-xl focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all duration-200"
                />
              </div>
              {errors.phone && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all duration-200 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Verification Method */}
            <div>
              <p className="text-sm font-semibold mb-2">Verification Method</p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="email"
                    {...register("verificationMethod")}
                    className="accent-orange-500"
                  />
                  <span>Email</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="phone"
                    {...register("verificationMethod")}
                    className="accent-orange-500"
                  />
                  <span>Phone</span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-orange-500 to-red-500 shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          {/* Switch to Login */}
          <p className="text-center text-sm mt-8">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-orange-600 font-semibold hover:underline hover:text-red-500 transition"
            >
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
