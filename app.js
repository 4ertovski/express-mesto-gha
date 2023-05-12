const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
/* const cards = require('./routes/cards');
const users = require('./routes/users'); */
const router = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use((req, res, next) => {
  req.user = { _id: '645d491a601a0da5604fa9e0' };
  next();
});

app.use(router);

/* app.use('/cards', cards);
app.use('/users', users); */

app.listen(PORT, () => {
  console.log(`start server on port ${PORT}`);
});
