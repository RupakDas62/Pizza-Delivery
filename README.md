# 🍕 Pizza Delivery Application

A full-stack pizza delivery web application built using **MERN stack (MongoDB, Express, React, Node.js)** with features like authentication, pizza customization, order tracking, admin dashboard, and online payments via Razorpay.

---

## 🚀 Features

### 👤 User Features

* User Authentication (Signup/Login/OTP Verification)
* Browse Pizza Menu
* Customize Pizza (size, toppings)
* Add to Cart & Place Orders
* Razorpay Payment Integration
* Order Tracking System
* User Dashboard

### 🛠️ Admin Features

* Inventory Management
* Manage Available Pizzas
* Order Management
* Admin Dashboard with analytics

---

## 🏗️ Tech Stack

### Frontend

* React + Vite
* Redux Toolkit
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Others

* Razorpay (Payments)
* JWT (Authentication)
* Nodemailer (Email Service)

---

## 📁 Project Structure

```
client/        → Frontend (React)
server/        → Backend (Node + Express)
```

Detailed structure: 

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-repo/pizza-delivery.git
cd pizza-delivery
```

### 2. Setup Backend

```bash
cd server
npm install
npm run dev
```

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Authentication Flow

1. User signs up → OTP sent via email
2. OTP verification → Account activated
3. Login → JWT token issued
4. Protected routes use middleware (`authMiddleware`)

---

## 📡 API Endpoints

### 🔑 Auth Routes (`/api/auth`)

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| POST   | /signup          | Register user   |
| POST   | /login           | Login user      |
| POST   | /verify-otp      | Verify OTP      |
| POST   | /forgot-password | Send reset link |

---

### 🍕 Pizza Routes (`/api/pizza`)

| Method | Endpoint   | Description                     |
| ------ | ---------- | ------------------------------- |
| GET    | /options   | Get pizza customization options |
| GET    | /available | Get available pizzas            |

---

### 🛒 Order Routes (`/api/order`)

| Method | Endpoint | Description       |
| ------ | -------- | ----------------- |
| POST   | /place   | Place new order   |
| GET    | /:id     | Get order details |
| GET    | /user    | Get user orders   |

---

### 📦 Inventory Routes (`/api/inventory`)

| Method | Endpoint | Description   |
| ------ | -------- | ------------- |
| GET    | /        | Get inventory |
| POST   | /update  | Update stock  |

---

### 👑 Admin Routes (`/api/admin`)

| Method | Endpoint   | Description     |
| ------ | ---------- | --------------- |
| GET    | /dashboard | Admin analytics |
| GET    | /orders    | View all orders |

---

### 💳 Payment Routes (`/api/payment`)

| Method | Endpoint      | Description           |
| ------ | ------------- | --------------------- |
| POST   | /create-order | Create Razorpay order |
| POST   | /verify       | Verify payment        |

---

## 🧠 Core Backend Components

### Controllers

* `authController.js` → Handles authentication logic
* `orderController.js` → Order placement & tracking
* `inventoryController.js` → Stock management
* `paymentController.js` → Razorpay integration

### Models

* `User`
* `Order`
* `Inventory`
* `PizzaOptions`
* `AvailablePizza`

### Middlewares

* `authMiddleware` → JWT verification
* `adminMiddleware` → Admin access control

---

## 🎨 Frontend Architecture

### Pages

* Home
* Menu
* Cart
* Order Summary
* User Dashboard
* Admin Dashboard

### Components

* PizzaCard
* OrderStatusTracker
* InventoryTable
* ProtectedRoute

### State Management

* Redux Toolkit

  * `authSlice`
  * `cartSlice`

---

## 🔄 Order Flow

1. User selects pizza → Adds to cart
2. Clicks "Place Order"
3. Payment initiated via Razorpay
4. Payment verified
5. Order stored in DB
6. Inventory updated (`updateInventory.js`)
7. Order tracking enabled

---

## 💳 Payment Integration

* Razorpay Checkout used in frontend
* Backend verifies payment signature
* Secure transaction flow

---

## 📧 Email Service

* OTP verification emails
* Password reset emails
* Implemented using `sendEmail.js`

---

## 🔒 Security Features

* JWT Authentication
* Protected Routes
* Role-based Access (Admin/User)
* Secure Payment Verification

---

## 🚀 Future Improvements

* Real-time order tracking (WebSockets)
* Push notifications
* AI-based pizza recommendations (since you're into AI, obviously flex that)

---

## 👨‍💻 Author

**Rupak Das**

---

## 🧾 License

This project is licensed under the MIT License.
