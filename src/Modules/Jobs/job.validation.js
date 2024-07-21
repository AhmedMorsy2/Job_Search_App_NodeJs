import Joi from "joi";

/**
 * Joi validation schema for job details.
 * @type {Joi.ObjectSchema}
 * @property {string} jobTitle - The title of the job.
 * @property {string} jobLocation - The location of the job. Must be one of: "onsite", "remotely", "hybrid".
 * @property {string} workingTime - The working time for the job. Must be one of: "part-time", "full-time".
 * @property {string} seniorityLevel - The seniority level for the job. Must be one of: "Junior", "Mid-Level", "Senior", "Team-Lead", "CTO".
 * @property {string} id - The ID of the job. This field is required.
 */
const jobVal = Joi.object({
  jobTitle: Joi.string(),
  jobLocation: Joi.string().valid("onsite", "remotely", "hybrid "),
  workingTime: Joi.string().valid(" part-time", "full-time"),
  seniorityLevel: Joi.string().valid(
    "Junior",
    "Mid-Level",
    "Senior",
    "Team-Lead",
    "CTO "
  ),
  id: Joi.string().required(),
});

/**
 * Joi validation schema for applying to a job.
 * @type {Joi.ObjectSchema}
 * @property {string} jobId - The ID of the job to apply for. This field is required.
 * @property {string} userId - The ID of the user applying for the job. This field is optional.
 * @property {Array<string>} userTechSkills - The technical skills of the user applying for the job. This field is required.
 */
const applyVal = Joi.object({
  jobId: Joi.string().required(),
  userId: Joi.string(),
  userTechSkills: Joi.required(),
  resume: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid("application/pdf").required(),
    size: Joi.number().max(5242880).required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
  }).required(),
});
export { jobVal, applyVal };
