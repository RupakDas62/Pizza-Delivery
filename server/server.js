const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/configDB');

// Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const pizzaRoutes = require('./routes/pizzaRoutes');
const availablePizzaRoutes = require('./routes/availablePizzaRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require("./routes/paymentRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const deliveryAgentRoutes = require('./routes/deliveryAgentRoutes');

const app = express();
connectDB();

const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/pizza', pizzaRoutes);
app.use('/api/available-pizzas', availablePizzaRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/delivery-agents", deliveryAgentRoutes);

// Express app ko http server ke andar wrap karo
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*", // yaha tum apna frontend URL daal sakte ho e.g. "http://localhost:5173"
    methods: ["GET", "POST"]
  }
});

// Socket.io logic
io.on("connection", (socket) => {
  console.log("⚡ New socket connected:", socket.id);

  // User/Agent join kare specific order room
  socket.on("joinOrder", (orderId) => {
    socket.join(orderId);
    console.log(`✅ Socket ${socket.id} joined order room: ${orderId}`);
  });

  // Delivery agent location update kare
  socket.on("updateLocation", ({ orderId, coordinates }) => {
    io.to(orderId).emit("locationUpdated", coordinates);
    console.log(`📍 Order ${orderId} location updated:`, coordinates);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

// Server start
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
