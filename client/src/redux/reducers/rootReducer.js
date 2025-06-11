// src/redux/reducers/index.js
import { combineReducers } from "redux";
import cartReducer from "../slices/cartSlice";
import authReducer from "../slices/authSlice"; // assuming you already have this

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

export default rootReducer;
