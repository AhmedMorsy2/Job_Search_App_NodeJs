import Joi from "joi";

const signupVal = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email().required(),
  recoveryEmail: Joi.string().email(),
  password: Joi.string()
    .required()
    .pattern(/^[A-Z][a-z0-9A-Z]{8,12}$/),
  mobilePhone: Joi.string()
    .pattern(/^\+?[0-9]\d{0,10}$/)
    .required(),
  DOB: Joi.string().pattern(/^\d{4}-\d{1,2}-\d{1,2}$/),
  role: Joi.string().valid("user", "companyHR").required(),
  status: Joi.string().valid("online", "offline"),
});

const signinVal = Joi.object({
  email: Joi.string().email(),
  password: Joi.string()
    .pattern(/^[A-Z][a-z0-9A-Z]{8,12}$/)
    .required(),
  mobilePhone: Joi.string().pattern(/^\+?[0-9]\d{0,10}$/),
});

const updatePasswordVal = Joi.object({
  oldPassword: Joi.string()
    .required()
    .pattern(/^[A-Z][a-z0-9A-Z]{8,12}$/),
  newPassword: Joi.string()
    .required()
    .pattern(/^[A-Z][a-z0-9A-Z]{8,12}$/),
});

const verifyOTPval = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.number().required(),
});

const resetPassVal = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string()
    .required()
    .pattern(/^[A-Z][a-z0-9A-Z]{8,15}$/),
});

export { signupVal, signinVal, updatePasswordVal, verifyOTPval, resetPassVal };
