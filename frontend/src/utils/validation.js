import {
  Form as veeForm,
  Field as veeField,
  defineRule,
  ErrorMessage,
  configure
} from "vee-validate";
import {
  required,
  min,
  max,
  numeric,
  min_value as minValue,
  max_value as maxValue,
  excluded
} from "@/vee-validate/rules";

export default {
  install(app) {
    app.component("veeForm", veeForm);
    app.component("veeField", veeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("numeric", numeric);
    defineRule("min_value", minValue);
    defineRule("max_value", maxValue);
    defineRule("excluded", excluded);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is Required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          email: `Please enter a valid Email.`,
          min_value: `The field ${ctx.field} is too low.`,
          max_value: `The field ${ctx.field} is too high.`,
          excluded: `You're now allowed to use ${ctx.field} for this field.`
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
