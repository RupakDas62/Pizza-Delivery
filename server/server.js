const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/configDB');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const pizzaRoutes = require('./routes/pizzaRoutes');
const availablePizzaRoutes = require('./routes/availablePizzaRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require("./routes/paymentRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");


const app = express();
connectDB();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
 
app.use('/api/admin', adminRoutes);


app.use('/api/pizza', pizzaRoutes);

app.use('/api/available-pizzas', availablePizzaRoutes);


app.use('/api/orders', orderRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/inventory", inventoryRoutes);

// app.use('/api/status', statusRoutes);

module.exports = app;  


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
