import { name } from "ejs";
import mongoose from "mongoose";




const productSchema = new mongoose.Schema({

name:{
type:String

},
price:{
type:Number

},
category:{
type:String,
enum: ["electronics", "fashion", "sports"],
},
description:{
type:String

},
stock:{
type:Number

}







},{timestamps:true})


const produtModel = mongoose.model("Product",productSchema)

export default produtModel