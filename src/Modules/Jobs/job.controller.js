import { App } from "../../../Database/Models/app.model.js";
import { Job } from "../../../Database/Models/job.models.js";
import { catchError } from "../../utils/catchError.js";

/**
 * Adds a new job listing for a company.
 * @group Jobs - Operations related to job listings
 * @param {string} req.user.id - The ID of the user adding the job.
 * @param {string} req.params.id - The ID of the company associated with the job.
 * @param {object} req.body - The job details to be added.
 * @returns {object} 200 - An object containing success message and the added job details.
 * @throws {500} 500 - Internal server error if there is an issue adding the job.
 */
const addJob = catchError(async (req, res) => {
  req.body.addedBy = req.user.id;
  req.body.company = req.params.id;
  let job = await Job.insertMany(req.body);
  res.status(200).json({ message: "Success", job });
});

/**
 * Updates an existing job listing by its ID.
 * @group Jobs - Operations related to job listings
 * @param {string} req.params.id - The ID of the job to be updated.
 * @param {object} req.body - The updated job details.
 * @returns {object} 200 - An object containing success message and the updated job details.
 * @throws {500} 500 - Internal server error if there is an issue updating the job.
 */
const updateJob = catchError(async (req, res) => {
  let job = await Job.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  res.status(200).json({ message: "Success", job });
});

/**
 * Deletes a job listing by its ID.
 * @group Jobs - Operations related to job listings
 * @param {string} req.params.id - The ID of the job to be deleted.
 * @returns {object} 200 - An object containing success message and the deleted job details.
 */
const deleteJob = catchError(async (req, res) => {
  let job = await Job.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Success", job });
});

/**
 * Retrieves all job listings.
 * @group Jobs - Operations related to job listings
 * @returns {object} 200 - An object containing success message and all job listings.
 */
const allJobs = catchError(async (req, res) => {
  let jobs = await Job.find().populate("company");
  res.status(200).json({ message: "Success", jobs });
});

/**
 * Retrieves all job listings for a specific company.
 * @group Jobs - Operations related to job listings
 * @param {string} req.company._id - The ID of the company to retrieve jobs for.
 * @returns {object} 200 - An object containing success message and job listings for the company.
 */
const compJobs = catchError(async (req, res) => {
  const jobs = await Job.find({ company: req.company._id }).populate(
    "company",
    "companyName companyEmail"
  );
  res.status(200).json({ message: "Success", jobs });
});

/**
 * Retrieves job listings based on specified filters.
 * @group Jobs - Operations related to job listings
 * @param {object} req.filter - The filters to apply when searching for jobs.
 * @returns {object} 200 - An object containing success message and job listings matching the filters.
 */
const searchForJob = catchError(async (req, res) => {
  const jobs = await Job.find(req.filter).populate("company");
  res.status(200).json({ message: "Success", jobs });
});

/**
 * Applies for a job listing.
 * @route POST /api/jobs/apply
 * @group Jobs - Operations related to job listings
 * @param {string} req.user.id - The ID of the user applying for the job.
 * @param {object} req.body - The application details including jobId and user skills.
 * @returns {object} 200 - An object containing success message and details of the applied job.
 */
const applyJob = catchError(async (req, res) => {
  req.body.userId = req.user.id;
  let apply = await App.insertMany(req.body);
  res.status(200).json({ message: "Success", apply });
});

export {
  addJob,
  updateJob,
  deleteJob,
  allJobs,
  compJobs,
  searchForJob,
  applyJob,
};
