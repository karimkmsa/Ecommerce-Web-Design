import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    wishlist: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }],
        default: []
    },

    role: {
        type: String,

        enum: ["admin", "user"],

        default: "user"
    }

}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);

export default userModel;