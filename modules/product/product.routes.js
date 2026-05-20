import express from 'express'
import { addProduct, deleteProduct, getProduct, updateProduct,getProductId, dashboardPage } from './product.controller.js'

 const router = express.Router()

router.get("/admin",dashboardPage)
router.get("/", getProduct);
router.get("/:id", getProductId);
router.post("/add-product",addProduct)
router.put("/updateProduct",updateProduct)
router.delete("/deleteProduct",deleteProduct)


export default router