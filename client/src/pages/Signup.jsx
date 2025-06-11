import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      if (response.data.message.includes("OTP")) {
        setOtpSent(true);
        setSuccessMsg("OTP sent to your email. Please check your inbox.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const handleOTPVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-email", {
        email,
        otp,
      });

      setSuccessMsg(response.data.message);
      // Redirect to login after a short delay
      toast.success("Signup successful");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error("Signup error");
      setError(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(120deg, #ff4e50 0%, #fc913a 100%)" }}
    >
      <div className="w-full max-w-md bg-orange-100 bg-opacity-90 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Create an Account</h2>

        {error && (
          <div className="text-red-700 bg-red-100 border border-red-400 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="text-green-700 bg-green-100 border border-green-400 p-2 rounded mb-4 text-sm">
            {successMsg}
          </div>
        )}

        {!otpSent ? (
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block mb-1 text-orange-900 font-semibold">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-orange-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-orange-50 text-orange-900"
              />
            </div>
            <div>
              <label className="block mb-1 text-orange-900 font-semibold">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-orange-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-orange-50 text-orange-900"
              />
            </div>
            <div>
              <label className="block mb-1 text-orange-900 font-semibold">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-orange-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-orange-50 text-orange-900"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-md"
            >
              Register
            </button>
          </form>
        ) : (
          <form onSubmit={handleOTPVerify} className="space-y-5">
            <p className="text-orange-900 text-center">
              Enter the OTP sent to <span className="font-medium">{email}</span>
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-orange-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-orange-50 text-orange-900"
            />
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Verify OTP & Complete Signup
            </button>
            <div className="text-sm text-center text-orange-900">
              Didn’t get the code?{" "}
              <button
                type="button"
                onClick={handleSignup}
                className="text-red-600 hover:underline"
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-orange-900">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
