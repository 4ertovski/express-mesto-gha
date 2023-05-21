const mongoose = require('mongoose');
const validator = require('validator');
const { urlRegExp } = require('../utils/variables');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Поле email  должно быть заполнено'],
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: true,
      minLength: [8, 'Минимальная длина поля "name" - 8'],
      select: false,
    },
    name: {
      type: String,
      required: [true, 'Поле "name" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      default: 'Жак-Ив Кусто',
    },

    about: {
      type: String,
      required: [true, 'Поле "name" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "about" - 2'],
      maxlength: [30, 'Максимальная длина поля "about" - 30'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      required: [true, 'Поле "avatar" должно быть заполнено'],
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (v) => urlRegExp.test(v),
        message: 'Некорректный URL',
      },
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('user', userSchema);
