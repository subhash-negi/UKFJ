import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://SaralHain:Subhash123%23@cluster0.ywub2ex.mongodb.net/UKFJ").then(()=>{
        console.log("db connected")
    })
}