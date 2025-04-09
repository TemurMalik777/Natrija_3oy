const Joi = require("joi");

const ownerValidation = Joi.object({
  full_name: Joi.string().min(3).max(30).required(),
  phone_number: Joi.string()
    .pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Telefon raqam formati XX-XXX-XX-XX bo'lishi kerak",
    }),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  organization_name: Joi.string().required(),
});

module.exports = ownerValidation;

// const Joi = require("joi");

// const ownerValidation = (req) => {
//   const schema = Joi.object({
//     full_name: Joi.string().min(3).max(30).required(),
//     phone_number: Joi.string()
//       .pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/)
//       .required()
//       .messages({
//         "string.pattern.base":
//           "Telefon raqam formati XX-XXX-XX-XX bo'lishi kerak",
//       }),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(6).max(30).required(),
//     refresh_token: Joi.string().optional(),
//     organization_name: Joi.string().required(),
//   });

//   return schema.validate(req.body, { abortEarly: false });
// };

// module.exports = ownerValidation;
