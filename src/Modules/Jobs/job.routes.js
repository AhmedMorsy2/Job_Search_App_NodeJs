import { Router } from "express";
import { checkOwner, checkRole } from "../../Middlewares/company.middleware.js";
import {
  addJob,
  allJobs,
  applyJob,
  compJobs,
  deleteJob,
  searchForJob,
  updateJob,
} from "./job.controller.js";
import { checkToken } from "../../utils/checkToken.js";
import {
  apply,
  checkJob,
  filterJob,
  findComp,
} from "../../Middlewares/job.middleware.js";
import { validations } from "../../utils/validation.js";
import { applyVal, jobVal } from "./job.validation.js";

const jobRouter = Router();
jobRouter.use(checkToken);

/**
 * Retrieves all job listings.
 * @route GET /api/job/all
 * @group Jobs - Operations related to job listings
 * @returns {object} 200 - An object containing success message and all job listings.
 */
jobRouter.get("/all", allJobs);
/**
 * Searches for job listings based on specified filters.
 * @route GET /api/job/search
 * @group Jobs - Operations related to job listings
 * @query take the filter you want to searh with
 * @returns {object} 200 - An object containing success message and job listings matching the filters.
 */
jobRouter.get("/search", filterJob, searchForJob);

/**
 * Retrieves all job listings for a specific company by company name.
 * @route GET /api/job/company/:companyName
 * @group Jobs - Operations related to job listings
 * @param {string} req.params.companyName - The name of the company to retrieve jobs for.
 * @returns {object} 200 - An object containing success message and job listings for the company.
 */
jobRouter.get("/company/:companyName", findComp, compJobs);

/**
 * Applies for a job listing.
 * @route POST /api/job/apply
 * @group Jobs - Operations related to job listings
 * @param {string} req.user.id - The ID of the user applying for the job.
 * @param {object} req.body - The application details including jobId and user skills.
 * @returns {object} 200 - An object containing success message and details of the applied job.
 */
jobRouter.post("/apply", validations(applyVal), apply, applyJob);

jobRouter.use(checkRole);
jobRouter.use(checkOwner);

/**
 * Adds a new job listing for a company.
 * @route POST /api/job/add/:id
 * @group Jobs - Operations related to job listings
 * @param {string} req.user.id - The ID of the user adding the job.
 * @param {string} req.params.id - The ID of the company associated with the job.
 * @param {object} req.body - The job details to be added.
 * @returns {object} 200 - An object containing success message and the added job details.
 */
jobRouter.post("/add/:id", validations(jobVal), addJob);

/**
 * Updates an existing job listing by its ID.
 * @route PUT /api/job/update/:id
 * @group Jobs - Operations related to job listings
 * @param {string} req.params.id - The ID of the job to be updated.
 * @param {object} req.body - The updated job details.
 * @returns {object} 200 - An object containing success message and the updated job details.
 */
jobRouter.put("/update/:id", checkJob, updateJob);

/**
 * Deletes a job listing by its ID.
 * @route DELETE /api/job/delete/:id
 * @group Jobs - Operations related to job listings
 * @param {string} req.params.id - The ID of the job to be deleted.
 * @returns {object} 200 - An object containing success message and the deleted job details.
 */
jobRouter.delete("/delete/:id", checkJob, deleteJob);

export default jobRouter;
