const { celebrate, Joi, CelebrateError } = require('celebrate');
const { badRequestErrorText } = require('../configs/errorTexts');

const priorityValidator = (value) => {
  if (/[^lmh]/.test(value)) {
    throw new CelebrateError(badRequestErrorText);
  }
  return value;
};

module.exports.taskValidator = celebrate({
  body: Joi.object().keys({
    header: Joi.string().min(1).max(100).required(),
    description: Joi.string().min(1).required(),
    priority: Joi.string().custom(priorityValidator).required(),
    date: Joi.string().length(10).required(),
    done: Joi.boolean().required(),
  }),
});

module.exports.idValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
});
