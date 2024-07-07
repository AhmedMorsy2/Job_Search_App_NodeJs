import { App } from "../../../Database/Models/app.model.js";
import { Company } from "../../../Database/Models/Company.model.js";
import { Job } from "../../../Database/Models/job.models.js";
import { catchError } from "../../utils/catchError.js";

/**
 * Adds a new company.
 * @route POST /api/company/add
 * @group company - Operations related to company
 * @param {string} req.user.id - The ID of the user adding the company (companyHR).
 * @param {object} req.body - The company details to be added.
 * @returns {object} 200 - An object containing a success message and the added company details.
 */
const addCompany = catchError(async (req, res) => {
  req.body.companyHR = req.user.id;
  let company = await Company.insertMany(req.body);
  res.status(200).json({ message: "Success", company });
});

/**
 * Updates an existing company by its ID.
 * @route PUT /api/company/update/:id
 * @group company - Operations related to company
 * @param {string} req.params.id - The ID of the company to be updated.
 * @param {object} req.body - The updated company details.
 * @returns {object} 200 - An object containing a success message and the updated company details.
 */
const updateCompany = catchError(async (req, res) => {
  let company = await Company.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.status(200).json({ message: "Success", company });
});

/**
 * Deletes a company by its ID.
 * @route DELETE /api/company/delete/:id
 * @group company - Operations related to company
 * @param {string} req.params.id - The ID of the company to be deleted.
 * @returns {object} 200 - An object containing a success message and the deleted company details.
 */
const deleteCompany = catchError(async (req, res) => {
  let company = await Company.findOneAndDelete({ _id: req.params.id });
  res.status(200).json({ message: "Success", company });
});

/**
 * Retrieves a company and its job listings by the company ID.
 * @route GET /api/company/:id
 * @group company - Operations related to company
 * @param {string} req.params.id - The ID of the company to retrieve.
 * @returns {object} 200 - An object containing a success message, the company details, and the company's job listings.
 */
const getCompany = catchError(async (req, res) => {
  let company = await Company.findById({ _id: req.params.id });
  let jobs = await Job.find({ company: company._id });
  res
    .status(200)
    .json({ message: "Success", Company: company, CompanyJobs: jobs });
});

/**
 * Searches for a company by its name.
 * @route POST /api/company/search
 * @group company - Operations related to company
 * @param {string} req.body.companyName - The name of the company to search for.
 * @returns {object} 200 - An object containing a success message and the company details if found.
 */
const searchCompany = catchError(async (req, res) => {
  let company = await Company.find({ companyName: req.body.companyName });
  res.status(200).json({ message: "Success", company });
});

/**
 * Retrieves a company and its applications by the company ID.
 * @route GET /api/company/applications/:id
 * @group company - Operations related to company
 * @param {string} req.params.id - The ID of the company to retrieve applications for.
 * @returns {object} 200 - An object containing a success message, the company details, and the applications with user details.
 */
const companyApps = catchError(async (req, res) => {
  let company = await Company.findOne({ _id: req.params.id });
  let jobs = await Job.find({ company: company._id });
  let jobIds = jobs.map((job) => job._id);
  let apps = await App.find({ jobId: { $in: jobIds } }).populate(
    "userId",
    "userName mobilePhone email"
  );
  res.status(200).json({ message: "Success", company, applications: apps });
});

export {
  addCompany,
  updateCompany,
  deleteCompany,
  getCompany,
  searchCompany,
  companyApps,
};
