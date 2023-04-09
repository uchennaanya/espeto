import { Router } from 'express'
const route = Router()

import { createOrder, getOrders, getOrder, updateOrder, deleteOrder } from '../controllers/orderController';

route.post('/create', createOrder)
route.get('/get/all', getOrders)
route.get('/get/:id', getOrder)
route.patch('/update/:id', updateOrder)
route.delete('/delete/:id', deleteOrder)

export default route
