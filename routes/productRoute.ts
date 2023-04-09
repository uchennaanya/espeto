import { Router } from 'express'
const route = Router()

import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/productController';

route.post('/create', createProduct)
route.get('/all', getProducts)
route.get('/:id', getProduct)
route.patch('/:id', updateProduct)
route.delete('/:id', deleteProduct)

export default route
