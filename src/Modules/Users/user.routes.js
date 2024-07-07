import { Router } from "express";
import {
  allSpecificRecoveryEmail,
  anotherProfile,
  deleteUser,
  profileData,
  requestOTP,
  resetPassword,
  signin,
  signup,
  upadateUser,
  updatePassword,
  verifyOTPHandler,
} from "./user.controller.js";
import {
  checkAnotherProfile,
  checkEmail,
  checkPassword,
  loginError,
  requestOtpFunc,
  resetPasswordFunc,
  updateCheck,
} from "../../Middlewares/user.middleware.js";
import { validations } from "../../utils/validation.js";
import {
  resetPassVal,
  signinVal,
  signupVal,
  updatePasswordVal,
  verifyOTPval,
} from "./user.validation.js";
import { checkToken } from "../../utils/checkToken.js";
import { checkRole } from "../../Middlewares/company.middleware.js";

const userRouter = Router();

/**
 * @route POST /auth/signup
 * @access Public
 * @description Sign up a new user.
 * @param {function} validations - Middleware to validate the signup data.
 * @param {function} checkEmail - Middleware to check if email is already in use.
 * @param {function} signup - Controller function to handle signup.
 */
userRouter.post("/signup", validations(signupVal), checkEmail, signup);

/**
 * @route POST /auth/signin
 * @access Public
 * @description Sign in an existing user.
 * @param {function} validations - Middleware to validate the signin data.
 * @param {function} loginError - Middleware to handle login errors.
 * @param {function} signin - Controller function to handle signin.
 */
userRouter.post("/signin", validations(signinVal), loginError, signin);

userRouter.use(checkToken);

/**
 * @route PUT /auth/update
 * @description Update user information.
 * @access Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} updateCheck - Middleware to check update data.
 * @param {function} updateUser - Controller function to handle user update.
 */
userRouter.put("/update", updateCheck, upadateUser);

/**
 * @route DELETE /auth/delete
 * @description Delete the user account.
 * @access Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} deleteUser - Controller function to handle user deletion.
 */
userRouter.delete("/delete", deleteUser);

/**
 * @route GET /auth/profile
 * @description Get the profile data of the logged-in user.
 * @access Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} profileData - Controller function to get the user's profile data.
 */
userRouter.get("/profile", profileData);

/**
 * @route GET /auth/profile/:id
 * @description Get the profile data of another user by their ID.
 * @access Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} checkAnotherProfile - Middleware to check if the other profile exists.
 * @param {function} anotherProfile - Controller function to get the other user's profile data.
 */
userRouter.get("/profile/:id", checkAnotherProfile, anotherProfile);

/**
 * @route PUT /auth/password
 * @description Update the password of the logged-in user.
 * @access Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} validations - Middleware to validate the password update data.
 * @param {function} checkPassword - Middleware to check the current password.
 * @param {function} updatePassword - Controller function to handle password update.
 */
userRouter.put(
  "/password",
  validations(updatePasswordVal),
  checkPassword,
  updatePassword
);

/**
 * @route GET /auth/recovery/:recoveryEmail
 * @description Get all users associated with a specific recovery email.
 * @access Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} checkRole - Middleware to check user role.
 * @param {function} allSpecificRecoveryEmail - Controller function to get users by recovery email.
 */
userRouter.get("/recovery/:recoveryEmail", checkRole, allSpecificRecoveryEmail);

/**
 * @route POST /auth/request-otp
 * @description Request an OTP to be sent to the user's recovery email.
 * @access Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} requestOtpFunc - Middleware to handle OTP request.
 * @param {function} requestOTP - Controller function to request OTP.
 */
userRouter.post("/request-otp", requestOtpFunc, requestOTP);

/**
 * @route POST /auth/verify-otp
 * @description Verify the OTP sent to the user's email.
 * @access Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} validations - Middleware to validate the OTP.
 * @param {function} verifyOTPHandler - Controller function to verify OTP.
 */
userRouter.post("/verify-otp", validations(verifyOTPval), verifyOTPHandler);

/**
 * @route POST /auth/reset-password
 * @description Reset the user's password.
 * @access Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} validations - Middleware to validate the reset password data.
 * @param {function} resetPasswordFunc - Middleware to handle password reset.
 * @param {function} resetPassword - Controller function to reset password.
 */
userRouter.post(
  "/reset-password",
  validations(resetPassVal),
  resetPasswordFunc,
  resetPassword
);

export default userRouter;
