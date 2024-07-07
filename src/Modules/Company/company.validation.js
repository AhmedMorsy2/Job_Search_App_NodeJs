import Joi from "joi";

const compVal = Joi.object({
  companyName: Joi.string().required(),
  companyEmail: Joi.string().email().required(),
  numberOfEmployees: Joi.number().min(11).max(20),
});

export { compVal };
