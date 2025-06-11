const express = require('express');
const router = express.Router();
const { placeOrder, getMyOrders, getAllOrders } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware'); // Assume you're using JWT auth
const { adminOnly } = require("../middlewares/adminMiddleware");
// const updateInventoryAfterOrder = require('../utils/updateInventory')
const { markOrderPaid } = require('../controllers/orderController');

const { updateOrderStatusByAdmin } = require('../controllers/orderController');

// Route to place a new order
// router.post('/orders/customPizza', protect, placeCustomPizzaOrder);

// Route to get orders for logged-in user
router.get('/order/my', protect, getMyOrders);

router.get('/order/all', adminOnly, getAllOrders);

router.post('/order/place-order', protect, placeOrder);

router.put('/:orderId/pay', protect, markOrderPaid);

router.put('/order/:orderId/update-status', adminOnly, updateOrderStatusByAdmin);

module.exports = router;
