const jwt = require('jsonwebtoken');

const { authorizationIsNeededText } = require('../utils/errorTexts');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    res
      .status(401)
      .send({ message: authorizationIsNeededText });
  }

  const token = authorization.replace('Bearer ', '');
  const { NODE_ENV, JWT_SECRET } = process.env;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    res
      .status(401)
      .send({ message: authorizationIsNeededText });
  }

  req.user = payload;

  next();
};
