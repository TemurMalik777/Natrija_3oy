const Joi = require("joi");

const categoriesValidation = (req) => {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
  });

  return schema.validate(req.body, { abortEarly: false });
};

module.exports = categoriesValidation;
