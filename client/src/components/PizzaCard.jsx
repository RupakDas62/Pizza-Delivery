const PizzaCard = ({ pizza }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-bold text-gray-800">{pizza.name}</h3>
      <p className="text-gray-600 mt-1">{pizza.description}</p>
      <p className="font-semibold text-lg mt-2 text-green-600">₹{pizza.price}</p>
      <button className="mt-4 w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
        Order Now
      </button>
    </div>
  );
};

export default PizzaCard;
