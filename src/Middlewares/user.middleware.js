import { User } from "../../Database/Models/User.model.js";
import { AppError } from "../utils/appError.js";
import bcrypt from "bcrypt";
import { generateOTP, sendEmail } from "../utils/sendEmail.js";

/**
 * Middleware to check if the email or mobile phone already exists in the database.
 * If exists, throws an error, otherwise hashes the password and generates the username.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const checkEmail = async (req, res, next) => {
  let isExist = await User.findOne({
    $or: [{ email: req.body.email }, { mobilePhone: req.body.mobilePhone }],
  });
  if (isExist) {
    next(new AppError("Email or Mobile Phone Already Exist", 409));
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    req.body.userName = req.body.firstName + " " + req.body.lastName;
    next();
  }
};

/**
 * Middleware to handle login errors by checking if the user exists and if the password is correct.
 * If invalid credentials, throws an error.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const loginError = async (req, res, next) => {
  const { email, mobilePhone } = req.body;
  const user = await User.findOne({
    $or: [{ email }, { mobilePhone }],
  });
  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return next(new AppError("Incorrect Email or Password", 404));

  next();
};

/**
 * Middleware to check if the profile of another user exists.
 * If not found, throws an error.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const checkAnotherProfile = async (req, res, next) => {
  let user = await User.findById({ _id: req.params.id });
  if (!user) return next(new AppError("User Profile NotFound", 404));

  next();
};

/**
 * Middleware to check if the email or mobile phone provided for update already exists in the database.
 * If exists, throws an error.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const updateCheck = async (req, res, next) => {
  const { email, mobilePhone } = req.body;
  let user = await User.find({
    $or: [{ email }, { mobilePhone }],
  });
  if (user.length > 0)
    return next(new AppError("Email or MobilPhone is Already exist", 404));
  next();
};

/**
 * Middleware to check if the current password is correct before updating to a new password.
 * If incorrect, throws an error. Otherwise, hashes the new password.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const checkPassword = async (req, res, next) => {
  let user = await User.findById({ _id: req.user.id });
  if (!bcrypt.compareSync(req.body.oldPassword, user.password))
    return next(new AppError("Incorrect Password", 400));

  req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 8);
  next();
};

/**
 * Middleware to handle OTP request. Generates an OTP and sends it to the user's recovery email.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const requestOtpFunc = async (req, res, next) => {
  let { email } = req.body;
  const user = await User.findOne({ recoveryEmail: email });
  if (!user) {
    return next(new AppError("User notFound", 404));
  }
  const otp = generateOTP();
  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
  await user.save();
  sendEmail(email, otp);
  next();
};

/**
 * Middleware to handle password reset. Updates the user's password if the user is found.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const resetPasswordFunc = async (req, res, next) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("User Not found", 404));
  }
  user.password = await bcrypt.hash(newPassword, 8);
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();
  next();
};

export {
  checkEmail,
  loginError,
  updateCheck,
  checkPassword,
  checkAnotherProfile,
  requestOtpFunc,
  resetPasswordFunc,
};
