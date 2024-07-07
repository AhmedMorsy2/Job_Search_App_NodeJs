import mongoose, { Schema, model } from "mongoose";

const schema = new Schema(
  {
    jobTitle: String,
    jobLocation: String,
    workingTime: String,
    seniorityLevel: String,
    jobDescription: String,
    technicalSkills: String,
    softSkills: String,
    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
    },
  },
  {
    versionKey: false,
  }
);

export const Job = model("Job", schema);
