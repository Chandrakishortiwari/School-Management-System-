import mongoose from "mongoose";

 const Conect = async ()=>{
  try{
   await mongoose.connect("mongodb://localhost:27017/Schoolmangementsystem");
   console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
 };
 
 export default Conect;