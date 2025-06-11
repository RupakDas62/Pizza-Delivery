import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h2>
        <p className="text-gray-700 mb-2">Thank you for your order.</p>
        <p className="text-lg font-semibold">Total Paid: ₹{amount}</p>
        <button
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => navigate("/menu")}
        >
          Continue Ordering
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
