const InventoryTable = ({ inventory }) => {
  return (
    <div className="overflow-x-auto mt-6">
      {Object.keys(inventory).map((category) => (
        <div key={category} className="mb-6">
          <h2 className="text-xl font-semibold capitalize mb-2 text-gray-800">{category}</h2>
          <table className="min-w-full border rounded">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 border">Item</th>
                <th className="px-4 py-2 border">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(inventory[category]).map(([item, qty]) => (
                <tr key={item} className="text-center hover:bg-gray-50">
                  <td className="px-4 py-2 border">{item}</td>
                  <td className="px-4 py-2 border">{qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default InventoryTable;
