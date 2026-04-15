import mongoose from "mongoose";

const AcademicYearSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // "2024-2025"
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("AcademicYear", AcademicYearSchema);