const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = { _id: '64310d98ca35a3d2094b2d82' }; //TODO! new ID
  next();
});

app.use(router);

app.use((req, res) => {
  res.status(404).send({
    message: 'Not Found',
  });
});

app.listen(PORT, () => {
  console.log(`start server on port ${PORT}`);
});