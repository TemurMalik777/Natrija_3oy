const Joi = require("joi");

const clientValidation = Joi.object({
  first_name: Joi.string().max(30).required().messages({
    "string.base": `"first_name" matn bo'lishi kerak`,
    "string.empty": `"first_name" bo'sh bo'lmasligi kerak`,
  }),
  last_name: Joi.string().max(30).required().messages({
    "string.base": `"last_name" matn bo'lishi kerak`,
    "string.empty": `"last_name" bo'sh bo'lmasligi kerak`,
  }),
  phone: Joi.string()
    .pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": `"phone" formati noto'g'ri. Masalan: 90-123-45-67`,
      "any.required": `"phone" maydoni majburiy`,
    }),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  region_id: Joi.number().integer().required().messages({
    "number.base": `"region_id" raqam bo'lishi kerak`,
    "any.required": `"region_id" maydoni majburiy`,
  }),
  address: Joi.string().max(255).optional().allow("").messages({
    "string.base": `"address" matn bo'lishi kerak`,
  }),
  password_series: Joi.string()
    .pattern(/^[A-Za-z0-9]+$/)
    .max(10)
    .optional()
    .allow("")
    .messages({
      "string.pattern.base": `"password_series" faqat harf va raqamdan iborat bo'lishi kerak`,
    }),
  password_selfie: Joi.string().optional().allow("").messages({
    "string.base": `"password_selfie" matn bo'lishi kerak`,
  }),
  refresh_token: Joi.string().optional(),
});

module.exports = clientValidation;
