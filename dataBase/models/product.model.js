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

},
image:{
    type:String
},
rating: {
    type: Number,
    default: 4.5
},

reviews: {
    type: Number,
    default: 0
},

sold: {
    type: Number,
    default: 0
}






},{timestamps:true})


const produtModel = mongoose.model("Product",productSchema)

export default produtModel