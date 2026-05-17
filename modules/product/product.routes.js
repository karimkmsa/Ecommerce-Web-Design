import express from 'express'
import { addProduct, deleteProduct, getProduct, updateProduct } from './product.controller.js'

export default router = express.Router()




router.get("/",getProduct)
router.post("/",addProduct)
router.put("/updateProduct",updateProduct)
router.delete("/deleteProduct",deleteProduct)