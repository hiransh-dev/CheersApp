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
  menuItem: Joi.object({
    title: Joi.string().min(1).max(30).required().escapeHTML(),
    desc: Joi.string().min(1).max(200).allow(null, "").escapeHTML(),
    price: Joi.number().min(1).max(99).positive().precision(2).required(),
    category: Joi.string()
      .valid("Drinks", "Food", "Soft Drinks")
      .required()
      .escapeHTML(),
    subcategory: Joi.string()
      .valid("Beers", "World Beers", "Ale", "Whiskey", "Vodka", "Rum", "")
      .allow(null, "")
      .escapeHTML(),
  }).required(),
});

const joiUserSchema = Joi.object({
  registerUser: Joi.object({
    email: Joi.string().min(4).max(25).email().required().escapeHTML(),
    password: Joi.string().min(4).max(25).required().escapeHTML(),
    firstName: Joi.string().min(1).max(25).required().escapeHTML(),
    lastName: Joi.string().min(1).max(25).required().escapeHTML(),
    phoneNumber: Joi.number().min(0).max(9999999999).positive().required(),
  }).required(),
});

const joiOrdersSchema = Joi.object({
  order: Joi.object({
    order: Joi.array().items(
      Joi.object({
        id: Joi.string().required().escapeHTML(),
        quantity: Joi.number().min(1).max(100).positive().required(),
        price: Joi.number(),
      })
    ),
    tableNo: Joi.number().min(0).max(999).positive().required(),
  }).required(),
});

module.exports = { joiMenuSchema, joiUserSchema, joiOrdersSchema };
