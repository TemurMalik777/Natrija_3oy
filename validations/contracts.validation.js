const Joi = require("joi");

const contractValidation = (req) => {
  const schema = Joi.object({
    productId: Joi.number().integer().required(),
    clientId: Joi.number().integer().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    total_price: Joi.number().precision(2).required(),
    statusId: Joi.number(),
    ownerId: Joi.number()
  });

  return schema.validate(req.body);
};

module.exports = contractValidation;
