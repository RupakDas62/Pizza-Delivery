const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      type: { type: String, enum: ['custom', 'predefined'], required: true },
      predefinedPizza: {
        pizzaId: { type: mongoose.Schema.Types.ObjectId, ref: 'AvailablePizza' }
      },
      customPizza: {
        base: String,
        sauce: String,
        cheese: String,
        veggies: [String],
        meat: [String]
      },
      quantity: { type: Number, default: 1 }
    }
  ],
  totalPrice: { type: Number, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    address: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
      landmark: String
    }
  },
  status: { type: String, default: 'Pending' },
  paymentStatus: { type: String, default: 'Pending' },
  
  deliveryAgent: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "DeliveryAgent",
},
deliveryLocation: {
  type: { type: String, enum: ["Point"], default: "Point" },
  coordinates: { type: [Number], default: [0, 0] }, // [lng, lat]
},


}, { timestamps: true });

// ✅ Create a geospatial index for location
orderSchema.index({ location: '2dsphere' });

// ✅ Export the model
module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);

