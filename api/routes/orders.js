const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const ordersController = require('../controllers/orders');

router.get('/', checkAuth, ordersController.getOrders);

router.post('/', checkAuth, ordersController.createOrder);

router.get('/:orderId', checkAuth, ordersController.getOrderById);

router.delete('/:orderId', checkAuth, ordersController.deleteOrder);

module.exports = router;
