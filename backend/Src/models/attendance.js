import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    studentClassId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentClass",
      required: true,
      index: true,
    },

    date: {
      type: Date,
      required: true,
      set: (val) => {
        const d = new Date(val);
        d.setHours(0, 0, 0, 0); // remove time (important)
        return d;
      },
    },

    status: {
      type: String,
      enum: ["present", "absent", "leave"],
      required: true,
    },

    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true, // auto createdAt & updatedAt
  }
);

//  One attendance per student per day
AttendanceSchema.index(
  { studentClassId: 1, date: 1 },
  { unique: true }
);

export default mongoose.model("Attendance", AttendanceSchema);