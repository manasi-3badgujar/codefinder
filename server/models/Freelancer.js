import mongoose from "mongoose";

const freelancerSchema = new mongoose.Schema({
  userId: String,
  skills: { type: Array, default: [] },
  description: { type: String, default: "" },

  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },

  reviews: [
    {
      projectId: String,
      clientId: String,
      clientName: String,
      rating: Number,
      comment: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],

  currentProjects: { type: Array, default: [] },
  completedProjects: { type: Array, default: [] },
  applications: { type: Array, default: [] },
  funds: { type: Number, default: 0 }
});

export default mongoose.model("Freelancer", freelancerSchema);