import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dob: Date,
    gender: String,
    address: String,
    alternate_num: Number,
    aadhar: String,
    subject: String,
    qualification: String,
    joiningDate: Date,
    photo: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Teacher", TeacherSchema);