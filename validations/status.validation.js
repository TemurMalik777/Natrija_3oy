const Joi = require("joi");

const statusValidation = (req) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required().messages({
      "string.base": "Status name must be a string",
      "string.empty": "Status name is required",
      "string.min": "Status name must be at least 3 characters long",
      "string.max": "Status name must be less than 255 characters long",
    }),
  });

  return schema.validate(req.body);
};

module.exports = statusValidation;
