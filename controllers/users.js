const UserModel = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

const getUserInfo = (req, res, next) => {
  const id = req.user._id;
  UserModel.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с данным id не найден');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные!');
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
        throw new NotFoundError('Пользователь с данным id не найден');
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные!');
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUserInfo, updateProfile
}
