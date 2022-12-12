const Joi = require('joi');

const personSchema = Joi.object({
  name: Joi.object({
    firstName: Joi.object().required(),
    lastName: Joi.object().required()
  }).required(),
  age: Joi.object().required()
}).unknown(true);

module.exports = {
  personSchema
};
