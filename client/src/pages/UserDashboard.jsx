// src/pages/UserDashboard.jsx
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/orders/order/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(120deg, #ff4e50 0%, #fc913a 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto bg-[#ff944d]/80  backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-orange-400">
        <h1 className="text-4xl font-bold text-white text-center drop-shadow-md mb-4">
          Welcome, {user?.name}!
        </h1>
        <p className="text-white text-center text-lg mb-8">
          Email: {user?.email}
        </p>

        <h2 className="text-2xl font-semibold text-white mb-4 text-center">
          Your Recent Orders
        </h2>

        {loading ? (
          <p className="text-white text-center">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-white text-center">You have not placed any orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-orange-300 bg-[#faae57] text-orange-900 p-4 rounded-xl shadow-[0_4px_12px_rgba(255,120,0,0.3)] hover:shadow-lg transition-all"
              >
                <p className="font-semibold">Order ID: {order._id}</p>
                <p>
                  Status:{" "}
                  <span className="font-semibold text-orange-950">
                    {order.status}
                  </span>
                </p>
                <p>Total: ₹{order.totalPrice}</p>
                <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
