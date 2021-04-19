require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const {
  PORT, MONGO_URL, MongoConfig, limiter,
} = require('./utils/config');
const indexRouter = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(cors());

app.use(helmet());

app.use(limiter);

mongoose.connect(MONGO_URL, MongoConfig);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger);

app.use(indexRouter);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'Ошибка сервера!' : message });

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
