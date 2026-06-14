require("dotenv").config();

const Joi = require("joi");

const schema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(
      "development",
      "production",
      "test"
    )
    .required(),

  PORT: Joi.number().required(),

  MONGO_URI: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),

  JWT_REFRESH_SECRET:
    Joi.string().required(),

  CLIENT_URL: Joi.string().required(),
}).unknown();

const { error } =
  schema.validate(process.env);

if (error) {
  throw new Error(
    `ENV Validation Error: ${error.message}`
  );
}

module.exports = process.env;