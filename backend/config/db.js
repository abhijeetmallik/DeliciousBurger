import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb').then(()=>console.log("DB Connected"));
}
