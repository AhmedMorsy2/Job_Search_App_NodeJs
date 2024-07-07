import { App } from "../../Database/Models/app.model.js";
import { Company } from "../../Database/Models/Company.model.js";
import { User } from "../../Database/Models/User.model.js";
import { AppError } from "../utils/appError.js";

const checkInfo = async (req, res, next) => {
  let info = await Company.find({
    $or: [
      { companyEmail: req.body.companyEmail },
      { companyName: req.body.companyName },
    ],
  });
  if (info.length > 0)
    return next(
      new AppError("Choose another companyEmail or Company Name", 401)
    );
  next();
};

const checkRole = async (req, res, next) => {
  let user = await User.findOne({ role: req.user.role });
  if (!user) return next(new AppError("User NotFound", 404));
  if (user.role === "user")
    return next(new AppError("You are not authorized only HRs are", 409));
  next();
};

const checkOwner = async (req, res, next) => {
  let companyowner = await Company.findOne({ companyHR: req.user.id });
  if (!companyowner) return next(new AppError("You are not authorized", 401));
  req.company = companyowner;
  next();
};

const checkCompany = async (req, res, next) => {
  let company = await Company.findOne({
    $or: [{ _id: req.params.id }, { companyName: req.body.companyName }],
  });
  if (!company) return next(new AppError("Compnay NotFound", 404));
  next();
};

export { checkRole, checkOwner, checkCompany, checkInfo };
