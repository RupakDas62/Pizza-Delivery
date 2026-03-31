# 🍕 Pizza Delivery Application

## 📌 Overview

A full-stack pizza delivery web application built using the MERN stack (MongoDB, Express, React, Node.js).

The system allows users to browse available pizzas, customize their own pizzas, place orders, and make payments using Razorpay. It also includes an admin panel for managing inventory, pizzas, and order status.

Key highlights include support for both predefined and custom pizzas, real-time inventory updates, and secure JWT-based authentication.

---

## 🚀 Features

### 👤 User Features
- User Authentication (Signup / Login / Email Verification / Password Reset)
- Browse available pizzas
- Customize pizzas (base, sauce, toppings)
- Add to cart and place orders
- Online payment using Razorpay
- View order history

### 🛠️ Admin Features
- Manage inventory (ingredients stock)
- Add and manage available pizzas
- View all orders
- Update order status

---

## 🛠️ Tech Stack

### 💻 Frontend
- React (Vite)
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Razorpay Payment Gateway
---

## 📁 Project Structure

```
pizza-delivery/
│
├── client/
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middlewares/
│   └── utils/
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```
git clone <your-repo-link>
cd pizza-delivery
```

### 2. Backend Setup

```
cd server
npm install
npm run dev
```

### 3. Frontend Setup

```
cd client
npm install
npm run dev
```

---
## 🌐 API Documentation

### 🔐 Auth Module

| Method | Endpoint | Function | Description |
|-------|---------|----------|------------|
| POST | /api/auth/register | register | Register new user and send OTP for email verification |
| POST | /api/auth/login | login | Authenticate user and return JWT token |
| POST | /api/auth/verify-email | verifyEmail | Verify user email using OTP |
| POST | /api/auth/forgot-password | forgotPassword | Send OTP for password reset |
| POST | /api/auth/reset-password | resetPassword | Reset password using OTP |

---

### 👑 Admin Module

| Method | Endpoint | Function | Description |
|-------|---------|----------|------------|
| POST | /api/admin/register | registerAdmin | Register admin user |
| POST | /api/admin/login | loginAdmin | Authenticate admin and return JWT |

---

### 🍕 Available Pizza Module

| Method | Endpoint | Function | Description |
|-------|---------|----------|------------|
| GET | /api/available-pizza/ | getAllPizzas | Fetch all available pizzas |
| POST | /api/available-pizza/seed | seedPizzas | Seed default pizzas (dev only) |
| POST | /api/available-pizza/create-pizza | createAvailablePizza | Create new pizza |

---

### ⚙️ Pizza Options Module

| Method | Endpoint | Function | Description |
|-------|---------|----------|------------|
| GET | /api/pizza/options | getPizzaOptions | Get pizza customization options |
| POST | /api/pizza/seed-options | seedPizzaOptions | Seed default options |

---

### 📦 Order Module

| Method | Endpoint | Function | Description |
|-------|---------|----------|------------|
| GET | /api/order/order/my | getMyOrders | Get logged-in user orders |
| GET | /api/order/order/all | getAllOrders | Get all orders (admin) |
| POST | /api/order/order/place-order | placeOrder | Place new order and update inventory |
| PUT | /api/order/:orderId/pay | markOrderPaid | Mark order as paid |
| PUT | /api/order/order/:orderId/update-status | updateOrderStatusByAdmin | Update order status (admin) |

---

### 📦 Inventory Module

| Method | Endpoint | Function | Description |
|-------|---------|----------|------------|
| POST | /api/inventory/ | createInventory | Create or replace inventory (admin) |
| GET | /api/inventory/ | getInventory | Get inventory |
| PUT | /api/inventory/ | updateInventory | Update inventory quantities |

---

### 💳 Payment Module

| Method | Endpoint | Function | Description |
|-------|---------|----------|------------|
| POST | /api/payment/create | createPaymentOrder | Create Razorpay payment order |

## 🗄️ Database Models

### 👤 User Model

| Field | Type | Description |
|------|------|------------|
| name | String | User name |
| email | String | Unique user email |
| password | String | Hashed password |
| role | String | user / admin / delivery |
| isVerified | Boolean | Email verification status |
| otp | String | OTP for verification/reset |
| otpExpiry | Date | OTP expiration time |

---

### 🍕 Available Pizza Model

| Field | Type | Description |
|------|------|------------|
| name | String | Pizza name |
| description | String | Pizza description |
| price | Number | Price of pizza |
| imageUrl | String | Image URL |
| ingredients | Array[String] | List of ingredients |

---

### ⚙️ Pizza Options Model

| Field | Type | Description |
|------|------|------------|
| baseOptions | Array | Base types with price |
| sauceOptions | Array | Sauce options with price |
| cheeseOptions | Array | Cheese options with price |
| veggieOptions | Array | Veggie options with price |
| meatOptions | Array | Meat options with price |

---

### 📦 Inventory Model

| Field | Type | Description |
|------|------|------------|
| base | Map<String, Number> | Base stock quantities |
| sauce | Map<String, Number> | Sauce stock |
| cheese | Map<String, Number> | Cheese stock |
| veggies | Map<String, Number> | Veggies stock |
| meat | Map<String, Number> | Meat stock |

---

### 🧾 Order Model

| Field | Type | Description |
|------|------|------------|
| user | ObjectId | Reference to User |
| items | Array | Ordered items (custom/predefined) |
| items.type | String | custom / predefined |
| items.predefinedPizza | Object | Reference to pizza |
| items.customPizza | Object | Custom pizza config |
| items.quantity | Number | Quantity of item |
| totalPrice | Number | Total order price |
| location | Object | Delivery location |
| location.coordinates | Array | [longitude, latitude] |
| location.address | Object | Full delivery address |
| status | String | Order status (Pending, etc.) |
| paymentStatus | String | Payment status (Pending/Paid) |

---

### 📌 Special Notes

- Orders support both **custom pizzas** and **predefined pizzas**
- Inventory uses **Map structure** for flexible stock management
- Order model includes **geospatial location (2dsphere index)**


## 🔄 Application Flow

### 🛒 Order Flow

1. User browses available pizzas or customizes a pizza  
2. User adds items to cart  
3. User places order using `/api/order/order/place-order`  
4. Backend validates order details (items, location, price)  
5. For **custom pizzas**, inventory is updated dynamically  
6. Order is stored in database with status = "Pending"  
7. User can view orders using `/api/order/order/my`  

---

### 💳 Payment Flow

1. Frontend sends request to `/api/payment/create` with amount  
2. Backend creates Razorpay order and returns order details  
3. User completes payment on Razorpay  
4. After successful payment, frontend calls `/api/order/:orderId/pay`  
5. Backend updates:
   - `paymentStatus = "Paid"`  
   - Stores payment details  
6. Order is now confirmed  

---

### 🔐 Authentication Flow

1. User registers using `/api/auth/register`  
2. OTP is generated and sent via email  
3. User verifies email using `/api/auth/verify-email`  
4. After verification, user logs in via `/api/auth/login`  
5. Backend returns JWT token  
6. Token is used to access protected routes  

---

### 🛠️ Admin Flow

1. Admin logs in via `/api/admin/login`  
2. Admin can:
   - View all orders (`/api/order/order/all`)  
   - Update order status  
   - Manage inventory  
   - Add new pizzas  

---

### 📦 Inventory Flow

1. Inventory is created/updated by admin  
2. When a **custom pizza order** is placed:
   - Ingredients are deducted from inventory  
3. Inventory ensures stock consistency for future orders  

## 🔐 Authentication

- JWT-based authentication is implemented  
- After login, a token is generated and sent to the client  
- Token contains user ID and role  
- Protected routes use middleware (`protect`) to verify token  
- Admin routes use additional middleware (`adminOnly`)  

---

## 🧠 System Architecture

- Frontend (React) communicates with backend via REST APIs  
- Backend (Express) handles authentication, business logic, and database operations  
- MongoDB stores users, orders, pizzas, and inventory  
- Razorpay is used for payment processing  

---

## ⚠️ Notes

- Inventory is automatically updated for **custom pizza orders**  
- Email service is used for OTP-based verification and password reset  
- Order supports both **custom and predefined pizzas**  
- Geolocation is stored using MongoDB 2dsphere index  

---

## 🚀 Future Improvements

- Real-time order tracking  
- Push notifications for order updates  
- Better inventory alert system  
- Admin analytics dashboard  
