const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const UserModel = require('../models/user');

const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');

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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) {
      next(new UnauthorizedError('Неправильные почта/пароль'));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      next(new UnauthorizedError('Неправильные почта/пароль'));
    } else {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser, login,
}
