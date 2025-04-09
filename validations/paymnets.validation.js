const Joi = require("joi");

const paymentValidation = (req) => {
  const schema = Joi.object({
    contract_id: Joi.number().integer().required(),
    amount: Joi.number().precision(2).required(),
    payment_date: Joi.string().required(),
    method: Joi.string().valid("naqd", "karta", "bank").required(),
  });

  return schema.validate(req.body, { abortEarly: false });
};

module.exports = paymentValidation;
