import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { selectAuth } from "../redux/selectors/authSelector";
import { toast } from "react-toastify";

const Menu = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newPizza, setNewPizza] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    ingredients: "",
  });

  const dispatch = useDispatch();
  const user = useSelector(selectAuth);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/available-pizzas");
        setPizzas(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch pizzas:", err.message);
        setLoading(false);
      }
    };
    fetchPizzas();
  }, []);

  const handleAddToCart = (pizza) => {
    dispatch(addToCart(pizza));
    toast.success('Pizza added to cart');
  };

  const handleSubmitNewPizza = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newPizza,
        ingredients: newPizza.ingredients.split(',').map((item) => item.trim()),
      };
      await axios.post("http://localhost:5000/api/available-pizzas/create-pizza", payload);
      setShowModal(false);
      window.location.reload(); // refresh to fetch updated pizzas
    } catch (err) {
      console.error("Error adding new pizza:", err.message);
    }
  };

  return (
    <div
      className="max-w-full mx-auto px-6 py-10 min-h-screen"
      style={{ background: "linear-gradient(120deg, #ff4e50 0%, #fc913a 100%)" }}
    >
      <h1 className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-orange-400 to-red-300 text-transparent bg-clip-text drop-shadow-lg">
        <span className="text-orange-200">🍕</span> Our Pizza Menu
      </h1>

      {loading ? (
        <p className="text-center text-lg text-orange-900">Loading pizzas...</p>
      ) : pizzas.length === 0 ? (
        <p className="text-center text-red-600 font-medium">No pizzas available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {pizzas.map((pizza) => (
            <div
              key={pizza._id}
              className="bg-orange-100 bg-opacity-90 backdrop-blur-sm shadow-lg rounded-3xl overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={pizza.imageUrl}
                alt={pizza.name}
                className="w-full h-60 object-cover rounded-t-3xl"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-orange-800">{pizza.name}</h2>
                <p className="text-sm text-orange-700 mt-1 mb-4">{pizza.description}</p>

                <div className="mb-4">
                  <h3 className="text-md font-semibold text-orange-600">Ingredients:</h3>
                  <ul className="list-disc list-inside text-sm text-orange-700">
                    {pizza.ingredients.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                {user.isAuthenticated && user.user?.role === "user" && (
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-lg font-bold text-red-600">₹{pizza.price}</span>
                    <button
                      onClick={() => handleAddToCart(pizza)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-semibold px-5 py-2 rounded-2xl shadow-md transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {user.user && <div className="mt-12 bg-orange-100 bg-opacity-90 rounded-3xl p-8 shadow-lg text-center">
        {user.user?.role === "admin" ? (
          <>
            <h3 className="text-3xl font-bold text-orange-700">Add a New Pizza to the Menu</h3>
            <p className="text-orange-900 my-4">Manage your menu offerings with ease.</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-3xl shadow-lg transition-all"
            >
              Add New Pizza
            </button>
          </>
        ) : (
          <>
            <h3 className="text-3xl font-bold text-orange-700">🍽 Want to Build Your Own Pizza?</h3>
            <p className="text-orange-900 my-4">
              Choose your favorite base, sauce, cheese, veggies, and meat!
            </p>
            <Link to="/customize-pizza">
              <button className="mt-5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-3xl shadow-lg transition-all">
                Customize Your Pizza
              </button>
            </Link>
          </>
        )}
      </div>}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-orange-700">Add New Pizza</h2>
            <form onSubmit={handleSubmitNewPizza} className="space-y-4">
              <input
                type="text"
                placeholder="Pizza Name"
                value={newPizza.name}
                onChange={(e) => setNewPizza({ ...newPizza, name: e.target.value })}
                className="w-full border border-orange-300 rounded-lg p-2"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={newPizza.description}
                onChange={(e) => setNewPizza({ ...newPizza, description: e.target.value })}
                className="w-full border border-orange-300 rounded-lg p-2"
              />
              <input
                type="number"
                placeholder="Price"
                value={newPizza.price}
                onChange={(e) => setNewPizza({ ...newPizza, price: e.target.value })}
                className="w-full border border-orange-300 rounded-lg p-2"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newPizza.imageUrl}
                onChange={(e) => setNewPizza({ ...newPizza, imageUrl: e.target.value })}
                className="w-full border border-orange-300 rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Ingredients (comma-separated)"
                value={newPizza.ingredients}
                onChange={(e) => setNewPizza({ ...newPizza, ingredients: e.target.value })}
                className="w-full border border-orange-300 rounded-lg p-2"
              />

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
