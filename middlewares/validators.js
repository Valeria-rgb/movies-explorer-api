const { celebrate, Joi } = require('celebrate');

const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Обязательное поле',
    }),
    password: Joi.string().required().pattern(/^[A-Za-z0-9]/i).messages({
      'string.min': 'Минимум два символа',
      'string.max': 'Максимум 30 символов',
      'any.required': 'Обязательное поле',
    }),
    name: Joi.string().min(2).max(30)
  }),
});

const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Обязательное поле',
    }),
    password: Joi.string().required().pattern(/^[A-Za-z0-9]/i).messages({
      'string.min': 'Минимум два символа',
      'string.max': 'Максимум 30 символов',
      'any.required': 'Обязательное поле',
    }),
  }),
});

const updateProfileValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const postMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2).max(30),
    image: Joi.string().required().regex(/^http[s]?:\/\/\w+/),
    trailer: Joi.string().required().regex(/^http[s]?:\/\/\w+/),
    thumbnail: Joi.string().required().regex(/^http[s]?:\/\/\w+/),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }).unknown(true),
});

module.exports = {
  signupValidator,
  signinValidator,
  updateProfileValidator,
  postMovieValidator,
  deleteMovieValidator,
};
