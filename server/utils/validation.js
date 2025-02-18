const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  // adminSecret: Joi.string().optional(), // ✅ Allow adminSecret
});

module.exports = { signupSchema };
