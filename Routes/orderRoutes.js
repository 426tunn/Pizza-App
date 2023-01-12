const express = require('express')
const OrderController = require('../Controllers/order');
const {AddOrderValiMw, updateOrderValiMw} = require("../Validators/orders.validator")
const orderRouter = express.Router();

orderRouter.post('/', AddOrderValiMw, OrderController.createOrder)

orderRouter.get('/:orderId', OrderController.getOrder)

orderRouter.get('/', OrderController.getOrders)

orderRouter.patch('/:id', updateOrderValiMw, OrderController.updateOrder)

orderRouter.delete('/:id', OrderController.deleteOrder)


module.exports = orderRouter;