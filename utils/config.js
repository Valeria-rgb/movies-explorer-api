const rateLimit = require('express-rate-limit');

const MongoUrl = 'mongodb://localhost:27017/bitfilmsdb';
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

module.exports = { MongoUrl, MongoConfig, limiter };
