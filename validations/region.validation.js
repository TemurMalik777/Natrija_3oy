const Joi = require("joi");

const regionValidation = (req) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required().messages({
      "string.base": "Region name must be a string",
      "string.empty": "Region name is required",
      "string.min": "Region name must be at least 3 characters long",
      "string.max": "Region name must be less than 255 characters long",
    }),
  });

  return schema.validate(req.body);
};

module.exports = regionValidation;
