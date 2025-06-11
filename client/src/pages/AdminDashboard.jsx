import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [inventory, setInventory] = useState(null);
  const [editedInventory, setEditedInventory] = useState({});
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // For modal open/close

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const invRes = await axios.get("http://localhost:5000/api/inventory", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInventory(invRes.data);
        setEditedInventory(invRes.data);

        const ordersRes = await axios.get("http://localhost:5000/api/orders/order/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(ordersRes.data);
      } catch (err) {
        console.error("Error fetching admin dashboard data:", err);
      }
    };

    fetchData();
  }, [token]);

  const handleInventoryChange = (category, item, value) => {
    setEditedInventory((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: Number(value),
      },
    }));
  };

  const updateInventory = async () => {
    try {
      await axios.put("http://localhost:5000/api/inventory", editedInventory, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Inventory updated successfully!");
      setInventory(editedInventory);
    } catch (err) {
      console.error("Inventory update failed:", err);
      alert("Failed to update inventory.");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/order/${orderId}/update-status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Could not update status.");
    }
  };

  const handleViewOrder = (orderId) => {
    const order = orders.find((o) => o._id === orderId);
    setSelectedOrder(order);
  };

  const closeModal = () => setSelectedOrder(null);

  return (
    <div
      className="min-h-screen p-8"
      style={{
        background: "linear-gradient(120deg, #ff4e50 0%, #fc913a 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto bg-white bg-opacity-90 rounded-3xl shadow-2xl p-10">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <h1 className="text-4xl font-extrabold text-orange-700 drop-shadow-md mb-4 sm:mb-0">
            Admin Dashboard
          </h1>
        </header>

        {/* Inventory Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-orange-700 mb-6 border-b-4 border-orange-400 w-max pb-1">
            Inventory Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {inventory &&
              Object.entries(inventory).map(([category, items]) =>
                category !== "_id" && category !== "__v" ? (
                  <div
                    key={category}
                    className="bg-orange-50 rounded-2xl p-6 shadow-inner shadow-orange-300 border border-orange-300"
                  >
                    <h3 className="text-xl font-bold capitalize text-orange-700 mb-4 border-b border-orange-300 pb-2">
                      {category}
                    </h3>
                    <ul className="space-y-3">
                      {Object.entries(items).map(([name, qty]) => (
                        <li
                          key={name}
                          className="flex justify-between items-center text-orange-800 font-medium"
                        >
                          <span className="capitalize">{name}</span>
                          <input
                            type="number"
                            min={0}
                            className="w-20 border border-orange-400 rounded-md px-3 py-1 text-center focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                            value={editedInventory?.[category]?.[name] ?? 0}
                            onChange={(e) =>
                              handleInventoryChange(category, name, e.target.value)
                            }
                            aria-label={`${category} ${name} quantity`}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null
              )}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={updateInventory}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
              aria-label="Update Inventory"
            >
              Update Inventory
            </button>
          </div>
        </section>

        {/* Orders Section */}
        <section>
          <h2 className="text-3xl font-semibold text-orange-700 mb-6 border-b-4 border-orange-400 w-max pb-1">
            Recent Orders
          </h2>

          <div className="overflow-x-auto rounded-2xl shadow-lg border border-orange-300 bg-orange-50">
            <table className="w-full table-auto text-orange-900 min-w-[700px]">
              <thead className="bg-orange-300 text-left text-lg font-semibold">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.slice(0, 7).map((order) => (
                    <tr
                      key={order._id}
                      onClick={() => handleViewOrder(order._id)}
                      className="border-t border-orange-300 hover:bg-orange-100 cursor-pointer transition"
                    >
                      <td className="p-4 font-mono text-sm truncate max-w-[150px]">{order._id}</td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onClick={(e) => e.stopPropagation()} // Prevent modal open on select click
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="border border-orange-400 rounded-md px-3 py-2 text-orange-700 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                          aria-label={`Change status for order ${order._id}`}
                        >
                          <option>Recieved</option>
                          <option>In Kitchen</option>
                          <option>Sent to Delivery</option>
                          <option>Delivered</option>
                        </select>
                      </td>
                      <td className="p-4 space-y-1 text-sm max-w-xs">
                        {order.items.map((item, i) => (
                          <div key={i} className="capitalize">
                            {item.type} x {item.quantity}
                          </div>
                        ))}
                      </td>
                      <td className="p-4 font-bold text-lg">{order.totalPrice}</td>
                    </tr>
                  ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-orange-600 italic">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Modal for Order Details */}
        {selectedOrder && (
  <div
    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
    onClick={closeModal}
    aria-modal="true"
    role="dialog"
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <div
      className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-orange-600 hover:text-orange-800 font-bold text-2xl"
        aria-label="Close Order Details"
      >
        &times;
      </button>

      <h3
        id="modal-title"
        className="text-3xl font-bold text-orange-700 mb-6 border-b border-orange-300 pb-2"
      >
        Order Details: {selectedOrder._id}
      </h3>

      <div id="modal-description" className="space-y-4 text-orange-900">
        <p>
          <strong>Customer Name :</strong> {selectedOrder.location.address.fullName}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="capitalize">{selectedOrder.status}</span>
        </p>
        <p>
          <strong>Total Price :</strong> ₹{selectedOrder.totalPrice}
        </p>
        <p>
          <strong>Order Address :</strong>{" "}
          {selectedOrder.location.address.street}, {selectedOrder.location.address.city},{" "}
          {selectedOrder.location.address.state}, {selectedOrder.location.address.country} -{" "}
          {selectedOrder.location.address.postalCode}
        </p>
        <p>
          <strong>Nearest Landmark:</strong> {selectedOrder.location.address.landmark}
        </p>
        <p>
          <strong>Contact Number:</strong> {selectedOrder.location.address.phone}
        </p>

        <p className="font-bold mt-6 text-lg">Ordered Items:</p>
        <div className="space-y-6">
          {selectedOrder.items.map((item, i) => (
            <div
              key={i}
              className="border border-orange-200 rounded-xl p-4 bg-orange-50 shadow-md"
            >
              <p className="font-semibold capitalize">
                {item.type} Pizza - Quantity: {item.quantity}
              </p>

              {item.type === "predefined" ? (
                <div className="mt-2">
                  <img
                    src={item.predefinedPizza.pizzaId.imageUrl}
                    alt={item.predefinedPizza.pizzaId.name}
                    className="w-32 h-32 object-cover rounded-lg shadow-sm border"
                  />
                  <p className="font-bold text-lg mt-2">
                    {item.predefinedPizza.pizzaId.name}
                  </p>
                  <p className="italic text-sm text-orange-700 mb-1">
                    {item.predefinedPizza.pizzaId.description}
                  </p>
                  <p className="text-sm">
                    <strong>Price:</strong> ₹{item.predefinedPizza.pizzaId.price}
                  </p>
                  <p className="text-sm mt-1">
                    <strong>Ingredients:</strong>{" "}
                    {item.predefinedPizza.pizzaId.ingredients.join(", ")}
                  </p>
                </div>
              ) : (
                <div className="mt-2 text-sm">
                  <p>
                    <strong>Base:</strong> {item.customPizza.base}
                  </p>
                  <p>
                    <strong>Sauce:</strong> {item.customPizza.sauce}
                  </p>
                  <p>
                    <strong>Cheese:</strong> {item.customPizza.cheese}
                  </p>
                  <p>
                    <strong>Veggies:</strong>{" "}
                    {item.customPizza.veggies.length > 0
                      ? item.customPizza.veggies.join(", ")
                      : "None"}
                  </p>
                  <p>
                    <strong>Meat:</strong>{" "}
                    {item.customPizza.meat.length > 0
                      ? item.customPizza.meat.join(", ")
                      : "None"}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedOrder.location && (
          <p className="mt-4">
            <strong>Delivery Location:</strong>{" "}
            Lat: {selectedOrder.location.coordinates[1]}, Lng:{" "}
            {selectedOrder.location.coordinates[0]}
          </p>
        )}

        {selectedOrder.paymentStatus && (
          <p>
            <strong>Payment Status:</strong>{" "}
            <span className="capitalize">{selectedOrder.paymentStatus}</span>
          </p>
        )}

        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(selectedOrder.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default AdminDashboard;
