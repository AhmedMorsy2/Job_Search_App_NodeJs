import nodemailer from "nodemailer";
import { User } from "../../Database/Models/User.model.js";

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-character OTP
};

const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ahmedaboalgoud2@gmail.com",
      pass: "sjhazidjnntrjwzn",
    },
  });

  const info = await transporter.sendMail({
    from: '"Ahmed Morsy" <ahmedaboalgoud2@gmail.com>',
    to: email,
    subject: "Password Recovery OTP ",
    html: `Your OTP for password recovery is: ${otp}`,
  });
};

const verifyOTP = async (email, otp) => {
  const user = await User.findOne({ email });
  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    throw new Error("Invalid or expired OTP");
  }
  return user;
};

export { sendEmail, verifyOTP, generateOTP };
