import { Router } from 'express'
const route = Router()

import { createUser, userProfile, userLogin } from '../controllers/userController';
import { validateUserCredentials } from '../middlewares/requestValidator';

route.post('/create', createUser)
route.get('/login', validateUserCredentials, userLogin)
route.get('/profile', userProfile)

export default route
