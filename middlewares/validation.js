const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequest = require('../errors/BadRequestError'); // 404
const { urlRegExp } = require('../utils/variables');
// валидания ссылок
const validationUrl = (url) => {
  const validate = validator.isUrl(url);
  if (validate) {
    return url;
  }
  throw new BadRequest('Некорректный адрес URL');
};
// валидация ID
const validationID = (id) => {
  if (urlRegExp.test(id)) {
    return id;
  }
  throw new BadRequest('Передан некорретный id.');
};

// аутенфикация
module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
// авторизация
module.exports.validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validationUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
// обновление данных пользователя
module.exports.validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});
// обновление аватара
module.exports.validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validationUrl),
  }),
});
// поиск по ID
module.exports.validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(validationID),
  }),
});
// создание карточки
module.exports.validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validationUrl),
  }),
});
// поиск карточки по Id
module.exports.validationCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(validationID),
  }),
});
