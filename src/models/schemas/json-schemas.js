const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.object({
    firstName: Joi.object().required(),
    lastName: Joi.object().required()
  }).required(),
  age: Joi.object().required()
}).unknown(true);

module.exports = {
  userSchema
};
