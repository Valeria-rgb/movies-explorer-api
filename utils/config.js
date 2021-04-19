require('dotenv').config();
const rateLimit = require('express-rate-limit');

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
  NODE_ENV,
} = process.env;

const JWT_SECRET = NODE_ENV === 'production'
  ? process.env.JWT_SECRET
  : 'dev-secret';

const API_URL = NODE_ENV === 'production'
  ? 'my-diploma.nomoredomains.club/api'
  : 'http://localhost:3000/';

const MongoConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = {
  PORT, MONGO_URL, NODE_ENV, JWT_SECRET, API_URL, MongoConfig, limiter,
};
