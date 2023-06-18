const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

// GOT DIRECTLY FROM SOURCE TO AVOID HTML IN DB
const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

const joiMenuSchema = Joi.object({
  menu: Joi.object({
    title: Joi.string().min(1).max(20).required().escapeHTML(),
    price: Joi.number().min(1).max(99).positive().precision(2).required(),
    desc: Joi.string().min(1).max(50).allow(null, "").escapeHTML(),
  }).required(),
});

const joiUserSchema = Joi.object({
  userRegister: Joi.object({
    email: Joi.string().min(4).max(25).email().required().escapeHTML(),
    phoneNumber: Joi.number().min(0).max(9999999999).positive().allow(null, ""),
    firstName: Joi.string().min(1).max(25).required().escapeHTML(),
    lastName: Joi.string().min(1).max(25).required().escapeHTML(),
    pwd: Joi.string().min(4).max(25).required().escapeHTML(),
    // pwd: Joi.string().min(8).max(25).required().escapeHTML(),
  }).required(),
});

module.exports = { joiMenuSchema };
