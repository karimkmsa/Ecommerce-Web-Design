import mongoose from "mongoose";

export const connection = async () => {
    try {
        await mongoose.connect(process.env.Oninle_DB);
        console.log("DB connected");
    } catch (err) {
        console.log("DB error", err);
    }
};