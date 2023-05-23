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

const {
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
  PORT = 3000,
} = process.env;

const app = express();
app.use(bodyParser.json());

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);
app.use(auth);
app.use(router);
app.use(helmet());
app.use(errors());

app.use(errorHandler);

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    await app.listen(PORT);
  } catch (err) {
    console.log(err);
  }
}

start()
  .then(() => console.log(`App has been successfully started!\n${MONGO_URL}\nPort: ${PORT}`));
