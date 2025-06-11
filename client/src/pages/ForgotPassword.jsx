import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1: enter email, 2: enter OTP and new password
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });

      setMessage(res.data.message || "OTP sent to your email.");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      setMessage(res.data.message || "Password reset successfully.");
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: "linear-gradient(120deg, #ff4e50 0%, #fc913a 100%)",
      }}
    >
      <div className="w-full max-w-md bg-orange-100 bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-orange-600 mb-6">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-2 rounded-lg border border-red-300">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 text-sm text-green-600 bg-green-100 px-4 py-2 rounded-lg border border-green-300">
            {message}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOTP} className="space-y-6">
            <div>
              <label className="block mb-1 text-sm text-gray-700 font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-xl border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-md"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block mb-1 text-sm text-gray-700 font-medium">
                OTP
              </label>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full px-4 py-2 rounded-xl border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-700 font-medium">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-2 rounded-xl border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-md"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
