import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addCustomPizzaToCart } from "../redux/slices/cartSlice";

const CustomizePizza = () => {
  const [options, setOptions] = useState(null);
  const [formData, setFormData] = useState({
    base: "",
    sauce: "",
    cheese: "",
    veggies: [],
    meat: [],
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/pizza/options");
        setOptions(res.data);
      } catch (err) {
        console.error("Failed to fetch pizza options", err);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    if (options) calculatePrice();
  }, [formData, options]);

  const calculatePrice = () => {
    const getPrice = (arr, name) => arr.find((item) => item.name === name)?.price || 0;

    let price = 0;
    price += getPrice(options.baseOptions, formData.base);
    price += getPrice(options.sauceOptions, formData.sauce);
    price += getPrice(options.cheeseOptions, formData.cheese);
    formData.veggies.forEach((veg) => {
      price += getPrice(options.veggieOptions, veg);
    });
    formData.meat.forEach((meat) => {
      price += getPrice(options.meatOptions, meat);
    });

    setTotalPrice(price);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (category, value) => {
    const currentValues = formData[category];
    setFormData({
      ...formData,
      [category]: currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCustomPizzaToCart({ ...formData, price: totalPrice }));
  };

  if (!options) {
    return <div className="text-center py-10 text-gray-600">Loading options...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-orange-200 via-orange-300 to-yellow-100 px-4 py-10">
      <div className="w-full max-w-3xl bg-orange-100 p-8 rounded-2xl shadow-xl border border-orange-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
          Customize Your Pizza 🍕
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Base */}
          <div>
            <label className="block font-medium mb-1 text-gray-800">Choose Base:</label>
            <select
              name="base"
              value={formData.base}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
              required
            >
              <option value="">Select base</option>
              {options.baseOptions.map((base) => (
                <option key={base.name} value={base.name}>
                  {base.name} (₹{base.price})
                </option>
              ))}
            </select>
          </div>

          {/* Sauce */}
          <div>
            <label className="block font-medium mb-1 text-gray-800">Choose Sauce:</label>
            <select
              name="sauce"
              value={formData.sauce}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
              required
            >
              <option value="">Select sauce</option>
              {options.sauceOptions.map((sauce) => (
                <option key={sauce.name} value={sauce.name}>
                  {sauce.name} (₹{sauce.price})
                </option>
              ))}
            </select>
          </div>

          {/* Cheese */}
          <div>
            <label className="block font-medium mb-1 text-gray-800">Choose Cheese:</label>
            <select
              name="cheese"
              value={formData.cheese}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
              required
            >
              <option value="">Select cheese</option>
              {options.cheeseOptions.map((cheese) => (
                <option key={cheese.name} value={cheese.name}>
                  {cheese.name} (₹{cheese.price})
                </option>
              ))}
            </select>
          </div>

          {/* Veggies */}
          <div>
            <label className="block font-medium mb-1 text-gray-800">Select Veggies:</label>
            <div className="grid grid-cols-2 gap-2">
              {options.veggieOptions.map((veggie) => (
                <label key={veggie.name} className="flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.veggies.includes(veggie.name)}
                    onChange={() => handleCheckboxChange("veggies", veggie.name)}
                  />
                  {veggie.name} (₹{veggie.price})
                </label>
              ))}
            </div>
          </div>

          {/* Meat */}
          <div>
            <label className="block font-medium mb-1 text-gray-800">Select Meat:</label>
            <div className="grid grid-cols-2 gap-2">
              {options.meatOptions.map((meat) => (
                <label key={meat.name} className="flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.meat.includes(meat.name)}
                    onChange={() => handleCheckboxChange("meat", meat.name)}
                  />
                  {meat.name} (₹{meat.price})
                </label>
              ))}
            </div>
          </div>

          {/* Price Display */}
          <div className="text-xl font-bold text-center text-green-700">
            Total Price: ₹{totalPrice}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-md"
          >
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomizePizza;
