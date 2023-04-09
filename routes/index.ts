import { Router } from 'express'
import productRoute from './productRoute'
import userRoute from './userRoute'
import orderRoute from './orderRoute'
import cartRoute from './cartRoute'

const router = Router()

router.use('/user', userRoute)
router.use('/products', productRoute)
router.use('/order', orderRoute)
router.use('/cart', cartRoute)

export default router
