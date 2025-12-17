import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    budget: Number,
    duration: Number,
    skills: [String],

    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    approvedFreelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    status: {
      type: String,
      enum: ["Open", "Assigned", "Submitted", "Completed"],
      default: "Open"
    },

    submission: {
      link: String,
      notes: String,
      submittedAt: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);