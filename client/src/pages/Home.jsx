import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/selectors/authSelector";
import { NavLink } from "react-router-dom";

const carouselImages = [
  "src/assets/Cheese-Dripping-Pizza.png",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=90",
  "src/assets/TomatoPizza.png",
  "src/assets/basilLeavePizza.png"
];

const animatedText =
  "Indulge in handmade pizzas, crafted with premium ingredients and baked to perfection. Fast, fun, and always fresh!";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  const user = useSelector(selectAuth);

  // Carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselImages.length
      );
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Infinite Typewriter effect
  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let text = "";
    let timeout;

    const type = () => {
      if (!isDeleting) {
        text += animatedText.charAt(index);
        index++;
        setDisplayedText(text);

        if (index < animatedText.length) {
          timeout = setTimeout(type, 30); // Typing speed
        } else {
          isDeleting = true;
          timeout = setTimeout(type, 1200); // Pause before deleting
        }
      } else {
        text = text.slice(0, -1);
        setDisplayedText(text);

        if (text.length > 0) {
          timeout = setTimeout(type, 20); // Deleting speed
        } else {
          isDeleting = false;
          index = 0;
          timeout = setTimeout(type, 800); // Pause before retyping
        }
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pizza-gradient text-white overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between px-6 py-20 relative z-10">
        
        {/* LEFT SECTION */}
        <div className="w-full md:w-1/2 flex flex-col gap-7 md:gap-10 md:ml-[-4rem]">
          <div className="flex items-center gap-3">
            <span className="text-4xl md:text-5xl animate-bounce">🍕</span>
            <span className="text-3xl md:text-4xl font-bold brand-font drop-shadow-lg">
              Hot & Fresh
            </span>
          </div>
          <h1 className="gradient-text font-extrabold text-4xl md:text-6xl leading-tight drop-shadow-lg text-left">
            Pizza Delivered <br className="hidden md:block" />
            <span>Right To Your Door</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-md font-medium drop-shadow-sm min-h-[96px]">
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>

          <div className="flex gap-4 mt-3 flex-col sm:flex-row">
            <NavLink to="/menu" className="cta-btn rounded-full px-8 py-3 shadow-xl flex items-center gap-2 text-lg">
              <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Order Now
            </NavLink>
            {!user.user && <NavLink to="/signup" className="glass-btn rounded-full px-8 py-3 border shadow-md flex items-center gap-2 text-lg">
              <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2a2 2 0 002 2h12a2 2 0 002-2v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <span className="text-orange-50">Create Account</span>
            </NavLink>}
          </div>
        </div>

        {/* RIGHT SECTION - CAROUSEL */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center items-center relative">
          <div className="w-[508px] h-[408px] rounded-3xl overflow-hidden shadow-orange-300 relative">
            {carouselImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Pizza ${index}`}
                className={`rounded-3xl absolute w-[500px] h-[400px] object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
