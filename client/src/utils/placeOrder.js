// src/utils/placeOrder.js
import axios from "axios";
import { clearCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

export const placeOrderAfterPayment = async (
  items,
  totalPrice,
  location,
  user,
  token,
  navigate,
  dispatch,
  address
) => {
  try {
    const formattedItems = items.map(item => {
      if (item.type === "predefined") {
        return {
          type: "predefined",
          predefinedPizza: { pizzaId: item._id },
          quantity: item.quantity,
        };
      } else if (item.type === "custom") {
        return {
          type: "custom",
          customPizza: {
            base: item.base,
            sauce: item.sauce,
            cheese: item.cheese,
            veggies: item.veggies,
            meat: item.meat,
          },
          quantity: item.quantity,
        };
      }
      return null;
    }).filter(Boolean);

    const orderPayload = {
      items: formattedItems,
      totalPrice,
      location: {
        coordinates: [location.longitude, location.latitude],
        address,
      },
    };

    const res = await axios.post(
      "http://localhost:5000/api/orders/order/place-order",
      orderPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Order Placed Successfully");
    dispatch(clearCart());
    navigate("/user-dashboard");
    
    return res.data.order._id;
  } catch (error) {
    console.error("Order placement failed:", error);
    toast.error(`Order failed: ${error?.response?.data?.message || "Try again"}`)
  }
};
