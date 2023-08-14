import {
  Form as veeForm,
  Field as veeField,
  defineRule,
  ErrorMessage,
  configure
} from "vee-validate";
import {
  required,
  alpha as alpha,
  min,
  max,
  numeric,
  min_value as minValue,
  max_value as maxValue,
  one_of as oneOf,
  email as email,
  confirmed as confirmed,
  regex as regex
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("veeForm", veeForm);
    app.component("veeField", veeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("alpha", alpha);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("numeric", numeric);
    defineRule("min_value", minValue);
    defineRule("max_value", maxValue);
    defineRule("categoryOneOf", oneOf);
    defineRule("email", email);
    defineRule("confirmPassword", confirmed);
    defineRule("regex", regex);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is Required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          min_value: `The field ${ctx.field} is too low.`,
          max_value: `The field ${ctx.field} is too high.`,
          categoryOneOf: `Invalid Category`
        };
        if (messages[ctx.rule.name]) {
          const message = messages[ctx.rule.name];
          return message;
        } else {
          const message = `The ${ctx.field} is Invalid.`;
          return message;
        }
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    });
  }
};
