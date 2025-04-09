const Joi = require("joi");

exports.productValidation = (body) =>{
  const ProductSchema = Joi.object({
    owner_id: Joi.number().required().messages({
      "any.required": "Egasining ID'si bo'lishi shart",
    }),
    category_id: Joi.number().required().messages({
      "any.required": "Kategoriya ID'si bo'lishi shart",
    }),
    title: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Sarlavha bo'sh bo'lmasligi kerak",
    }),
    description: Joi.string().max(1000).optional(),
    manufacture_year: Joi.number()
      .integer()
      .min(1950)
      .required()
      .messages({
        "number.base": "Ishlab chiqarilgan yil son bo'lishi kerak",
        "number.min": "Ishlab chiqarilgan yil 1950 yildan katta bo'lishi kerak",
      }),
    price_per_day: Joi.number().positive().required().messages({
      "number.base": "Narx son bo'lishi kerak",
      "number.positive": "Narx musbat bo'lishi kerak",
    }),
    is_available: Joi.boolean().required(),
    location: Joi.string().max(255).required(),
    image_url: Joi.string().uri().optional().messages({
      "string.uri": "Rasm havolasi to'g'ri URL bo'lishi kerak",
    }),
    contract_id: Joi.number().optional(),
  });
  return ProductSchema.validate(body, {
    abortEarly: false
  })
  }
