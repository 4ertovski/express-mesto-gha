const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const auth = require('./middlewares/auth');
const { validationCreateUser, validationLogin } = require('./middlewares/validation');
const { createUsers, login } = require('./controllers/auth');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(bodyParser.json());
app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUsers);
app.use(auth);
app.use(router);
app.use(helmet());
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});
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
