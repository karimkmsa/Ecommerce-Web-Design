import productModel from "../../dataBase/models/product.model.js"



export const addProduct = async(req,res)=>{
let {name,price,category,description,stock} = req.body
const addedProduct = await productModel.insertMany({name,price,category,description,stock})


res.json({messsege:"Products", addedProduct})



}

export const updateProduct = async(req,res)=>{
let {_id,name,price,category,description,stock} = req.body
const updatedProduct = await productModel.findByIdAndUpdate(_id,{name,price,category,description,stock},{new:true})


res.json({messsege:"Products", updatedProduct})



}



export const deleteProduct = async(req,res)=>{
let {_id} = req.body
const deletedProduct = await productModel.deleteOne(_id)


res.json({messsege:"Products", deletedProduct})



}

export const getProduct = async(req,res)=>{
const allproducts = await productModel.find()


res.json({messsege:"Products", allproducts})



}