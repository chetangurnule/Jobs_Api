import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "please provide company name"],
      maxlength: 60,
    },
    position: {
      type: String,
      required: [true, "please provide position"],
      maxlength: 255,
    },
    status: {
      type: String,
      enum: ["pending", "interview", "declined"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
