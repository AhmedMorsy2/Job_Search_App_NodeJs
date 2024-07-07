import { Company } from "../../Database/Models/Company.model.js";
import { Job } from "../../Database/Models/job.models.js";
import { User } from "../../Database/Models/User.model.js";
import { AppError } from "../utils/appError.js";

const checkJob = async (req, res, next) => {
  let job = await Job.findById({ _id: req.params.id });
  if (!job) return next(new AppError("Job notFound", 404));
  next();
};

const findComp = async (req, res, next) => {
  const { companyName } = req.params;
  if (!companyName) {
    return next(new AppError("Company name is required", 400));
  }
  const company = await Company.findOne({ companyName });
  if (!company) {
    return next(new AppError("Company not found", 404));
  }
  const jobs = await Job.find({ company: company._id });
  if (jobs.length === 0)
    return next(new AppError("There is no jobs for this company", 404));
  req.company = company;
  next();
};

const filterJob = async (req, res, next) => {
  const filters = {};
  const {
    workingTime,
    jobLocation,
    seniorityLevel,
    jobTitle,
    technicalSkills,
  } = req.query;

  if (workingTime) filters.workingTime = workingTime;
  if (jobLocation) filters.jobLocation = jobLocation;
  if (seniorityLevel) filters.seniorityLevel = seniorityLevel;
  if (jobTitle) filters.jobTitle = { $regex: jobTitle, $options: "i" };
  if (technicalSkills)
    filters.technicalSkills = { $in: technicalSkills.split(",") };

  req.filter = filters;
  next();
};

const apply = async (req, res, next) => {
  let user = await User.findOne({ role: req.user.role });
  let job = await Job.findOne({ _id: req.body.jobId });
  if (user.role === "companyHR")
    return next(new AppError("HRs are not allowed to apply", 401));
  if (!job) return next(new AppError("Job Notfound", 404));

  next();
};

export { checkJob, findComp, filterJob, apply };
