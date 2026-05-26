import express from 'express'
import { addToCart, getCart, removeFromCart, updateCartQuantity } from './cart.controller.js';
import { requireAuth } from '../../utils/middleware/requireAuth.js';
import { isAuthenticated } from '../../utils/middleware/auth.middleware.js';




const router = express.Router()







router.post("/add", requireAuth, addToCart);
router.get("/", requireAuth, getCart);
router.delete(
  "/remove/:productId",
  isAuthenticated,
  removeFromCart
);router.patch(
   "/update/:productId",
   isAuthenticated,
   updateCartQuantity
);

export default router