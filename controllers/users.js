const UserModel = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

const { badRequestErrorText, notFoundUserErrorText } = require('../utils/errorTexts');

const getUserInfo = (req, res, next) => {
  const id = req.user._id;
  UserModel.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(notFoundUserErrorText);
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError(badRequestErrorText);
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  UserModel.findByIdAndUpdate(req.user._id, { $set: { email, name } }, {
    runValidators: true,
    new: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(notFoundUserErrorText);
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError(badRequestErrorText);
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUserInfo, updateProfile,
};
