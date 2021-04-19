const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-err');
const { authorizationIsNeededText } = require('../utils/errorTexts');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(authorizationIsNeededText);
  }

  const token = authorization.replace('Bearer ', '');
  const { NODE_ENV, JWT_SECRET } = process.env;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError(authorizationIsNeededText);
  }

  req.user = payload;

  next();
};
