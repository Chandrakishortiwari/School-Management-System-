import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema(
  {
    className: {
      type: Number, 
      required: true,
    },
    classTeacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Class", ClassSchema);