import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { selectUser } from "../redux/selectors/authSelector";

import { toast } from "react-toastify";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/admin-dashboard" : "/menu");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, user, requiresOTP } = res.data;

      if (requiresOTP) {
        setShowOTPInput(true);
      } else {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setToken(token);
        dispatch(
          setCredentials({
            user: res.data.user,
            token: res.data.token,
          })
        );
        toast.success("Logged In Successfully");
        user.role === "admin" ? navigate("/admin-dashboard") : navigate("/menu");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error("Login error");
      console.log(err);
    }
  };

  const handleOTPVerify = async (e) => {
    e.preventDefault();
    // Your OTP verification logic (if needed)
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: "linear-gradient(120deg, #ff4e50 0%, #fc913a 100%)",
      }}
    >
      <div className="w-full max-w-md bg-orange-100 bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl p-8">
        <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-6">
          Welcome Back
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-2 rounded-lg border border-red-300">
            {error}
          </div>
        )}

        {!showOTPInput ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block mb-1 text-sm text-gray-700 font-medium">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              />
            </div>
            <div className="text-right text-sm">
              <Link to="/forgot-password" className="text-orange-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-md"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleOTPVerify} className="space-y-6">
            <p className="text-sm text-gray-700 text-center">
              Enter the OTP sent to <span className="font-medium">{email}</span>
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-md"
            >
              Verify OTP
            </button>
            <div className="text-sm text-center">
              Didn’t get the code?{" "}
              <button type="button" className="text-orange-600 hover:underline">
                Resend OTP
              </button>
            </div>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-gray-700">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-orange-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
