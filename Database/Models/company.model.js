import { Schema, model } from "mongoose";
import { Job } from "./job.models.js";
import { App } from "./app.model.js";

const schema = new Schema(
  {
    companyName: String,
    description: String,
    industry: String,
    address: String,
    numberOfEmployees: Number,
    companyEmail: String,
    companyHR: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
  }
);



export const Company = model("Company", schema);
