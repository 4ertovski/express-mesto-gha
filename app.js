const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const router = require('./routes');
const {
  createUserValidation,
  loginValidation,
} = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const {
  createUser,
  login,
} = require('./controllers/auth');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();
app.use(bodyParser.json());
app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);
app.use(auth);
app.use(router);
app.use(helmet());
app.use(errors());

app.use(errorHandler);
app.listen(PORT);
