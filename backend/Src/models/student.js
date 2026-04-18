import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      ref: "User"
    },
    dob: Date,
    gender: String,
    fatherName: String,
    motherName: String,
    aadhar: { type: String, unique: true, minlength: 12, maxlength: 12 },
    pin: { type: String, minlength: 6, maxlength: 6 },
    district: String,
    alternate_num: String,
    aadhar: String,
    photo: String,
  },
  { timestamps: true },
);

export default mongoose.model("Student", studentSchema);
