import { Router } from "express";
import { checkToken } from "../../utils/checkToken.js";
import {
  checkCompany,
  checkInfo,
  checkOwner,
  checkRole,
} from "../../Middlewares/company.middleware.js";
import {
  addCompany,
  companyApps,
  deleteCompany,
  getCompany,
  searchCompany,
  updateCompany,
} from "./company.controller.js";
import { validations } from "../../utils/validation.js";
import { compVal } from "./company.validation.js";

const compRouter = Router();
/**
 * Middleware to check authentication token.
 * @name UseCheckToken
 * @function
 * @memberof compRouter
 * @inner
 */
compRouter.use(checkToken);

/**
 * Search for a company by its name.
 * @route GET /api/company/search
 * @group company - Operations related to company
 * @middleware checkCompany
 * @returns {object} 200 - An object containing a success message and the company details if found.
 */
compRouter.get("/search", checkCompany, searchCompany);

/**
 * Add a new company.
 * @route POST /api/company/add
 * @group company - Operations related to company
 * @middleware validations(compVal), checkRole, checkInfo
 * @param {object} req.body - The company details to be added.
 */
compRouter.post("/add", validations(compVal), checkRole, checkInfo, addCompany);

/**
 * Retrieve a company and its job listings by the company ID.
 * @route GET /api/company/:id
 * @group company - Operations related to company
 * @middleware checkCompany, checkRole
 * @param {string} req.params.id - The ID of the company to retrieve.
 * @returns {object} 200 - An object containing a success message, the company details, and the company's job listings.
 */
compRouter.get("/:id", checkCompany, checkRole, getCompany);

/**
 * Update an existing company by its ID.
 * @route PUT /api/company/update/:id
 * @group company - Operations related to company
 * @middleware checkOwner, checkCompany
 * @param {string} req.params.id - The ID of the company to be updated.
 * @param {object} req.body - The updated company details.
 * @returns {object} 200 - An object containing a success message and the updated company details.
 */
compRouter.put("/update/:id", checkOwner, checkCompany, updateCompany);

/**
 * Delete a company by its ID.
 * @route DELETE /api/company/delete/:id
 * @group company - Operations related to company
 * @middleware checkOwner, checkCompany
 * @param {string} req.params.id - The ID of the company to be deleted.
 * @returns {object} 200 - An object containing a success message and the deleted company details.
 */
compRouter.delete("/delete/:id", checkOwner, checkCompany, deleteCompany);

/**
 * Retrieve a company and its applications by the company ID.
 * @route GET /api/company/applications/:id
 * @group company - Operations related to company
 * @middleware checkCompany, checkOwner
 * @param {string} req.params.id - The ID of the company to retrieve applications for.
 * @returns {object} 200 - An object containing a success message, the company details, and the applications with user details.
 */
compRouter.get("/applications/:id", checkCompany, checkOwner, companyApps);

export default compRouter;
