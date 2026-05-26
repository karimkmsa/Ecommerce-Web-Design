import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            quantity: Number,
            price: Number
        }
    ],

    totalPrice: Number,

    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending"
    }

}, { timestamps: true });

export default mongoose.model("order", orderSchema);