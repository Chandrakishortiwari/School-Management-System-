import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    user_id:{ type: String, unique: true },
    mobile: { type: String},
    password: String,
    role: {
      type: String,
      enum: ["admin", "teacher", "student", "parent"],
      default: "student",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);