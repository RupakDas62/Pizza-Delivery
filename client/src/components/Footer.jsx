import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-[#ff4e50] to-[#fc913a] text-white mt-10 pt-10 pb-4 shadow-inner mt-[-1px]">
      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-3 gap-8 text-sm sm:text-base">
        {/* Brand/Logo */}
        <div>
          <h2 className="text-2xl font-bold mb-2">🍕 Pizza Delivery</h2>
          <p className="text-white/90">
            Delivering happiness one slice at a time. Order your custom or
            classic pizzas in a few clicks.
          </p>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
          <ul className="space-y-1 text-white/90">
            <li>Email: support@pizzadelivery.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Address: 123, Flavor Street, Kolkata, IN</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:underline hover:text-yellow-100 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:underline hover:text-yellow-100 transition">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/user-dashboard" className="hover:underline hover:text-yellow-100 transition">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline hover:text-yellow-100 transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:underline hover:text-yellow-100 transition">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/30 mt-8 pt-4 text-center text-white/80 text-sm px-4">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Pizza Delivery</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
