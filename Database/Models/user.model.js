import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    firstName: String,
    lastName: String,
    userName: String,
    email: { type: String, unique: true },
    recoveryEmail: String,
    mobilePhone: { type: Number, unique: true },
    password: String,
    DOB: Date,
    role: { type: String, enum: ["user", "companyHR"], required: true },
    status: { type: String, enum: ["online", "offline"], default: "offline" },
    otp: String,
    otpExpires: Date,
  },
  {
    versionKey: false,
  }
);

export const User = model("User", schema);
