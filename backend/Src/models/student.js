import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dob: Date,
    gender: String,
    fatherName: String,
    motherName: String,
    address: String,
    district: String,
    pin: String,
    alternate_num:Number,
    aadhar: String,
    photo: String,
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);