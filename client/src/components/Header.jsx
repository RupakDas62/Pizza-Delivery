// src/components/Header.jsx
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount } from "../redux/selectors/cartSelector";
import { selectAuth } from "../redux/selectors/authSelector";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const Header = () => {
  const cartCount = useSelector(selectCartCount);
  const user = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(user)

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    toast.success("Logout successfull")
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-tr from-[#ff4e50] to-[#fc913a] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-3xl font-bold flex items-center gap-2 tracking-wide ml-[-70px]">
          <span className="text-4xl">🍕</span>
          <span className="drop-shadow">Pizza Delivery</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm sm:text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-100 underline underline-offset-4 font-semibold"
                : "hover:text-yellow-100 transition"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-100 underline underline-offset-4 font-semibold"
                : "hover:text-yellow-100 transition"
            }
          >
            Menu
          </NavLink>
          {user.user && user.user.role == 'user' ? <NavLink
            to="/user-dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-100 underline underline-offset-4 font-semibold"
                : "hover:text-yellow-100 transition"
            }
          >
            My Orders
          </NavLink> : user.user && user.user.role == 'admin' && <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-100 underline underline-offset-4 font-semibold"
                : "hover:text-yellow-100 transition"
            }
          >
            Dashboard
          </NavLink>}

          {user.isAuthenticated ? (
            <>
              <span className="text-white/90">
                Welcome,{" "}
                <span className="text-yellow-200 font-semibold">
                  {user.user.name}
                </span>
              </span>
              <Link to="/cart" className="relative text-xl hover:text-yellow-100 transition">
                🛒
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-300 text-black font-bold rounded-full text-xs px-2 py-0.5 shadow">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="ml-3 px-4 py-1.5 rounded-full bg-white text-[#ff4e50] font-semibold shadow hover:bg-yellow-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-100 underline underline-offset-4 font-semibold"
                    : "hover:text-yellow-100 transition"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-100 underline underline-offset-4 font-semibold"
                    : "hover:text-yellow-100 transition"
                }
              >
                Signup
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
