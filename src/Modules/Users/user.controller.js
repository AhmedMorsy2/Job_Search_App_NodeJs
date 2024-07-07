import { User } from "../../../Database/Models/User.model.js";
import jwt from "jsonwebtoken";
import { catchError } from "../../utils/catchError.js";
import { verifyOTP } from "../../utils/sendEmail.js";

/**
 * User signup.
 * @async
 * @function signup
 * @memberof UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} 200 - An object containing a success message and the created user details (without password).
 */
const signup = catchError(async (req, res) => {
  let user = await User.insertMany(req.body);
  user.password = undefined;
  res.status(200).json({ message: "Success", user });
});

/**
 * User signin.
 * @async
 * @function signin
 * @memberof UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} 200 - An object containing a success message and a JWT token.
 */
const signin = catchError(async (req, res) => {
  const user = await User.findOneAndUpdate(
    { $or: [{ email: req.body.email }, { mobilePhone: req.body.mobilePhone }] },
    { status: "online" },
    { new: true }
  );
  jwt.sign(
    {
      email: user.email,
      id: user._id,
      phone: user.mobilePhone,
      status: user.status,
      role: user.role,
    },
    "Morsy",
    (err, token) => {
      res.status(200).json({ message: "Success", token });
    }
  );
});

/**
 * Update user information.
 * @async
 * @function updateUser
 * @memberof UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} 200 - An object containing a success message and the updated user details.
 */
const upadateUser = catchError(async (req, res) => {
  const user = await User.findByIdAndUpdate({ _id: req.user.id }, req.body);
  res.status(200).json({ message: "Success", user });
});

/**
 * Delete user account.
 * @async
 * @function deleteUser
 * @memberof UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} 200 - An object containing a success message.
 */
const deleteUser = catchError(async (req, res) => {
  await User.findByIdAndDelete({ _id: req.user.id });
  res.status(200).json({ message: "Success" });
});

/**
 * Get profile data of the logged-in user.
 * @async
 * @function profileData
 * @memberof UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} 200 - An object containing a success message and the user's profile data (without password).
 */
const profileData = catchError(async (req, res) => {
  let user = await User.findById({ _id: req.user.id });
  user.password = undefined;
  res.status(200).json({ message: "Success", user });
});

/**
 * Get profile data of another user by ID.
 * @async
 * @function anotherProfile
 * @memberof UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.id - The ID of the user to retrieve.
 * @returns {Object} 200 - An object containing a success message and the user's profile data.
 */
const anotherProfile = catchError(async (req, res) => {
  let user = await User.findById({ _id: req.params.id });
  res.status(200).json({ message: "Success", user });
});

/**
 * Update the password of the logged-in user.
 * @async
 * @function updatePassword
 * @memberof UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.body.newPassword - The new password for the user.
 * @returns {Object} 200 - An object containing a success message and the updated user details.
 */
const updatePassword = catchError(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    { _id: req.user.id },
    { password: req.body.newPassword },
    { new: true, runValidators: true }
  );
  res.status(200).json({ message: "Success", user });
});

/**
 * Get all users associated with a specific recovery email.
 * @async
 * @function allSpecificRecoveryEmail
 * @memberof UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.recoveryEmail - The recovery email to search for.
 * @returns {Object} 200 - An object containing a success message and the users associated with the recovery email (without passwords).
 */
const allSpecificRecoveryEmail = catchError(async (req, res) => {
  const user = await User.find({ recoveryEmail: req.params.recoveryEmail });
  user.map((item) => {
    item.password = undefined;
  });
  res.status(200).json({ message: "Success", user });
});

/**
 * Request an OTP to be sent to the user's recovery email.
 * @async
 * @function requestOTP
 * @memberof UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} 200 - An object containing a success message indicating the OTP was sent.
 */
const requestOTP = catchError(async (req, res) => {
  res
    .status(200)
    .json({ message: "Success", message: "OTP sent to recovery email" });
});

/**
 * Verify the OTP sent to the user's email.
 * @async
 * @function verifyOTPHandler
 * @memberof UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.body.email - The user's email.
 * @param {string} req.body.otp - The OTP to verify.
 * @returns {Object} 200 - An object containing a success message and the user's email if the OTP is verified.
 */
const verifyOTPHandler = catchError(async (req, res) => {
  const { email, otp } = req.body;
  const user = await verifyOTP(email, otp);
  res.status(200).json({ message: "OTP verified", userEmail: user.email });
});

/**
 * Reset the user's password.
 * @async
 * @function resetPassword
 * @memberof UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} 200 - An object containing a success message indicating the password was reset.
 */
const resetPassword = catchError(async (req, res) => {
  res.status(200).json({ message: "Password reset successfully" });
});

export {
  signup,
  signin,
  upadateUser,
  deleteUser,
  profileData,
  anotherProfile,
  updatePassword,
  allSpecificRecoveryEmail,
  requestOTP,
  verifyOTPHandler,
  resetPassword,
};
