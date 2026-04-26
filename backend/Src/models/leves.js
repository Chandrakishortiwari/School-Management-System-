import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema(
  {
    userId: {
     type: String,
     required: true,
     ref: "User",
    },
    fromDate: {
      type: Date,
      required: true,
    },

    toDate: {
      type: Date,
      required: true,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    approvedBy: {
      type: String,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Leaves", LeaveSchema);