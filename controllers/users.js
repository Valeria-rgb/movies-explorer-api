const UserModel = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

const { badRequestErrorText, notFoundUserErrorText, conflictErrorText } = require('../utils/errorTexts');

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
      } else if (err.name === 'MongoError' && err.code === 11000 && err.codeName === 'DuplicateKey') {
        throw new ConflictError(conflictErrorText);
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports = {
  getUserInfo, updateProfile,
};
