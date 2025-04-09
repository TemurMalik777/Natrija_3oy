const Joi = require("joi");

const adminSchema = Joi.object({
  full_name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(50).required(),
  phone_number: Joi.string()
    .pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Telefon raqam formati XX-XXX-XX-XX bo'lishi kerak",
    }),
  assigned_region_id: Joi.number().required(),
  refresh_token: Joi.string().optional(),
  is_creater: Joi.boolean().optional(),
});

module.exports = adminSchema;
