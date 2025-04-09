const Joi = require("joi");

const deviceLogValidation = (req) => {
  const schema = Joi.object({
    product_id: Joi.number().integer().required(),
    log_date: Joi.date().required(),
    description: Joi.string().min(5).max(1000).required(),
  });

  return schema.validate(req.body, { abortEarly: false });
};

module.exports = deviceLogValidation;
