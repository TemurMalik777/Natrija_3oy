const Joi = require("joi");

const contractValidation = (req) => {
  const schema = Joi.object({
    product_id: Joi.number().integer().required(),
    client_id: Joi.number().integer().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    total_price: Joi.number().precision(2).required(),
    status: Joi.string().valid("active", "completed", "pending").required(),
  });

  return schema.validate(req.body);
};

module.exports = contractValidation;
