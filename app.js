require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const indexRouter = require('./routes/index');
const { centralErrorHandler } = require('./errors/central-error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  PORT, MONGO_URL, MongoConfig, limiter,
} = require('./utils/config');

const app = express();

app.use(cors());

app.use(helmet());

mongoose.connect(MONGO_URL, MongoConfig);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger);

app.use(limiter);

app.use(indexRouter);

app.use(errorLogger);

app.use(errors());

app.use(centralErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
