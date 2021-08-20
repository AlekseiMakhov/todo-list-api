const { celebrate, Joi, CelebrateError } = require('celebrate');
const { badRequestErrorText } = require('../configs/errorTexts');

const priorityValidator = (value) => {
  if ('/[^lmh]/g'.test(value)) {
    throw new CelebrateError(badRequestErrorText);
  }
  return value;
};

module.exports.taskValidator = celebrate({
  body: Joi.object().keys({
    header: Joi.string().required(),
    description: Joi.string(),
    priority: Joi.string().custom(priorityValidator).required(),
    date: Joi.date().required(),
  }),
});

