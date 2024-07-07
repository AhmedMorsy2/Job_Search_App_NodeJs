import mongoose, { Schema, model } from "mongoose";

const schema = new Schema(
  {
    jobId: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    userTechSkills: Array,
    userSoftSkills: Array,
  },
  {
    versionKey: false,
  }
);

export const App = model("App", schema);
