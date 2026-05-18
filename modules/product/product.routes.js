import express from 'express'
import { addProduct, deleteProduct, getProduct, seedProduct, updateProduct } from './product.controller.js'

 const router = express.Router()


router.get("/seed", seedProduct);
router.get("/", getProduct);
router.post("/",addProduct)
router.put("/updateProduct",updateProduct)
router.delete("/deleteProduct",deleteProduct)


export default router