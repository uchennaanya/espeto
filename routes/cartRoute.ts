import { Router } from 'express'
const route = Router()

import { createOrUpdateCart, getCarts, getCart, deleteCart } from '../controllers/cartController';

route.post('/create',  createOrUpdateCart)
route.get('/all', getCarts)
route.get('/:id', getCart)
route.delete('/:id', deleteCart)

export default route
