import mongoose from "mongoose";

const HostalPalnsSchema = new mongoose.Schema(
    {
     name: String, 
     amount: Number,
    }, 
  { timestamps: true }
)

export default  mongoose.model('HostalPlans', HostalPalnsSchema)