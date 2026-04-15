import mongoose from "mongoose";

const StudentClassSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
    },
    rollNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "passed", "failed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("StudentClass", StudentClassSchema);