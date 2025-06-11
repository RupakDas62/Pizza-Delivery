// src/pages/Cart.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  addToCart,
  clearCart,
  updateQuantity,
} from "../redux/slices/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { placeOrderAfterPayment } from "../utils/placeOrder";
import AddressModal from "../components/AddressModal";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      alert("Please login to continue");
      return navigate("/login");
    }

    setShowModal(true);
  };

  const startPayment = async (address) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await axios.post(
        "http://localhost:5000/api/payments/create",
        { amount: totalPrice },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { orderId, amount, currency, key } = res.data;

      const options = {
        key,
        amount,
        currency,
        name: "Pizza Delivery",
        description: "Test Transaction",
        order_id: orderId,
        handler: function (response) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const orderId = await placeOrderAfterPayment(
                items,
                totalPrice,
                { latitude, longitude },
                user,
                token,
                navigate,
                dispatch,
                address
              );
              if (!orderId) {
                alert("Order placement failed. Payment won't be marked.");
                return;
              }
              try {
                await axios.put(
                  `http://localhost:5000/api/orders/${orderId}/pay`,
                  {
                    paymentDetails: {
                      razorpayPaymentId: response.razorpay_payment_id,
                      razorpayOrderId: response.razorpay_order_id,
                      razorpaySignature: response.razorpay_signature,
                    },
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                alert("Order placed and payment verified!");
                dispatch(clearCart());
                navigate("/user-dashboard");
              } catch (error) {
                console.error("Failed to update payment status:", error);
                alert("Payment was successful, but updating order failed.");
              }
            },
            (error) => {
              console.error("Geolocation error:", error);
              alert("Location access is required to place the order.");
            }
          );
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: address.phone || "9999999999",
        },
        theme: {
          color: "#f97316",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment creation error:", error.response || error);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(120deg, #ff4e50 0%, #fc913a 100%)",
      }}
    >
      <AddressModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={(address) => startPayment(address)}
        user={JSON.parse(localStorage.getItem("user"))}
      />

      <div className="max-w-4xl mx-auto bg-[#ff944d]/80  backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-orange-400">
        <h2 className="text-4xl font-bold text-center text-white drop-shadow-md mb-8">
          🛒 Your Cart
        </h2>

        {items.length === 0 ? (
          <p className="text-center text-white text-lg">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item._id || item.tempId}
                className="flex justify-between items-start border border-orange-300 rounded-xl p-4 bg-[#ffc98a] shadow-lg hover:shadow-xl transition-all"
              >
                <div>
                  <h3 className="text-xl font-semibold text-orange-900">
                    {item.name || "Customized Pizza"}
                  </h3>
                  <p className="text-orange-800">Price: ₹{item.price}</p>
                  <div className="flex items-center mt-2 space-x-3">
                    <button
                      onClick={() =>
                        item.quantity > 1 &&
                        dispatch(
                          updateQuantity({
                            id: item._id,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                      className="bg-orange-300 hover:bg-orange-400 px-3 py-1 rounded-full text-lg font-bold text-white"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold text-orange-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item._id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                      className="bg-orange-300 hover:bg-orange-400 px-3 py-1 rounded-full text-lg font-bold text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-orange-900">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="mt-2 text-sm text-red-700 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-6 border-t border-white/40">
              <h3 className="text-2xl font-semibold text-white">Total:</h3>
              <p className="text-2xl font-bold text-white">₹{totalPrice}</p>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => dispatch(clearCart())}
                className="min-w-28 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-md"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow-md transition font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
