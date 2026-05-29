import mongoose from "mongoose";

export const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Closed"];

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Lead name is required"],
      trim: true,
      maxlength: [80, "Lead name cannot exceed 80 characters"]
    },
    email: {
      type: String,
      required: [true, "Lead email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: [25, "Phone number cannot exceed 25 characters"]
    },
    status: {
      type: String,
      enum: {
        values: LEAD_STATUSES,
        message: "Invalid lead status"
      },
      default: "New"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    }
  },
  { timestamps: true }
);

leadSchema.index({ email: 1, createdBy: 1 }, { unique: true });

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
