import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema(
  {
    className: {
      type:String, 
      required: true,
    },
    classTeacherId: {
      type: String,
      ref: "Teacher",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Class", ClassSchema);