// src/redux/slices/cartSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid"; // Helps give unique IDs to custom pizzas

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Supports both predefined and custom
  },
  reducers: {
    // Add available pizza (predefined)
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(
        (i) => i._id === item._id && i.type === "predefined"
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, type: "predefined", quantity: 1 });
      }
    },

    // Add custom pizza
    addCustomPizzaToCart: (state, action) => {
      const customPizza = action.payload;

      // Check if same config already exists (optional – strict match)
      const existing = state.items.find(
        (i) =>
          i.type === "custom" &&
          i.base === customPizza.base &&
          i.sauce === customPizza.sauce &&
          i.cheese === customPizza.cheese &&
          JSON.stringify(i.veggies.sort()) ===
            JSON.stringify(customPizza.veggies.sort()) &&
          JSON.stringify(i.meat.sort()) ===
            JSON.stringify(customPizza.meat.sort())
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...customPizza,
          type: "custom",
          id: nanoid(), // Unique ID for frontend use
          quantity: 1,
        });
      }
    },

    // Remove from cart
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i._id !== id && i.id !== id);
    },

    // Update quantity
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.items.find((i) => i._id === id || i.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  addCustomPizzaToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
