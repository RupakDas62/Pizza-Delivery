// src/components/AddressModal.jsx
import React, { useState } from "react";

const AddressModal = ({ isOpen, onClose, onSave, user }) => {
  const [address, setAddress] = useState({
    fullName: user?.name || "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    landmark: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      !address.fullName ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.postalCode ||
      !address.landmark
    ) {
      alert("Please fill in all fields");
      return;
    }
    onSave(address);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-orange-600 text-center">Delivery Address</h2>

        {["fullName", "phone", "street", "city", "state", "postalCode", "landmark"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={address[field]}
            onChange={handleChange}
            className="w-full border border-orange-300 rounded-lg px-4 py-2 focus:outline-orange-500"
          />
        ))}

        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-red-500">Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
