import express from 'express'
import { isAuthenticated } from '../../utils/middleware/auth.middleware.js';
import { createOrder } from './checkout.controller.js';





const router = express.Router()




router.post("/checkout", isAuthenticated, createOrder);







export default router ;