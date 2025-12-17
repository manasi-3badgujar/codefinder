import Freelancer from "../models/Freelancer.js";
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const getFreelancerProfile = async (req, res) => {
  const freelancer = await Freelancer.findOne({
    userId: req.params.userId
  });

  if (!freelancer)
    return res.status(404).json({ msg: "Profile not found" });

  res.json(freelancer);
};