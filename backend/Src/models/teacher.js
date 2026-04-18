import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      ref: "User"
    },
    dob: Date,
    gender: String,
    emali:String,
    address: String,
    alternate_num: String,
    aadhar: { type: String, unique: true, minlength: 12, maxlength: 12 },
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