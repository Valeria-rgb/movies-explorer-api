const UserModel = require('../models/user');

const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  UserModel.findOne({
    email,
  })
    .then((data) => {
      if (data) {
        throw new ConflictError('Пользователь с таким email уже существует!');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => UserModel.create({
      email,
      name,
      password: hash,
    }))
    .then((user) => res.status(200).send({
      email: user.email,
      name: user.name
    }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные!');
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
}
