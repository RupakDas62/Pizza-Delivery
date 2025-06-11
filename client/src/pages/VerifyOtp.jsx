// src/pages/VerifyOtp.jsx
import { useState } from "react";
import axios from "axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/verify-otp", { email, otp });
      setMessage(res.data.message || "OTP verified. You can reset your password.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Verify OTP</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            Verify OTP
          </button>
          {message && <p className="text-center text-sm text-gray-700">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
