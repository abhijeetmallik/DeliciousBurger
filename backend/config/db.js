import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://FoodCourt:abhifoodcourt@cluster0.pjqk1.mongodb.net/LPU_Food_Court').then(()=>console.log("DB Connected"));
}