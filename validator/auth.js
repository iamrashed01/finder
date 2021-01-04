const Joi = require('joi');

const localRegisterValidation = (req) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(req);
};

const verificationValidation = (req) => {
  const schema = Joi.object({
    code: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  });
  return schema.validate(req);
};

module.exports = {
  localRegisterValidation,
  verificationValidation,
};
