const router = require('express').Router();

const NotFoundError = require('../errors/not-found-err');

const { notFoundContentErrorText } = require('../utils/errorTexts');

router.all('*', ((req, res, next) => {
  next(new NotFoundError(notFoundContentErrorText));
}));

module.exports = router;
