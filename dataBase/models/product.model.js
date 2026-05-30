import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User"

    },

    name: {

        type: String

    },

    rating: {

        type: Number

    },

    comment: {

        type: String

    }

}, { timestamps: true });

const productSchema = new mongoose.Schema({

    name: {

        type: String

    },

    price: {

        type: Number

    },

    category: {

        type: String,

        enum: ["electronics", "fashion", "sports"]

    },

    description: {

        type: String

    },

    stock: {

        type: Number

    },

    image: {

        type: String

    },

    rating: {

        type: Number,

        default: 0

    },

    numReviews: {

        type: Number,

        default: 0

    },

    reviews: [reviewSchema],

    sold: {

        type: Number,

        default: 0

    }

}, { timestamps: true });

const productModel = mongoose.model(

    "Product",

    productSchema

);

export default productModel;