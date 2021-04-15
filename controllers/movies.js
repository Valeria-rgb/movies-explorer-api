const MovieModel = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const getMovies = (req, res, next) => {
  MovieModel.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  MovieModel.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные!');
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  MovieModel.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с таким id не найден');
      } else if (movie.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Нет! Вы не можете удалять фильмы других пользователей');
      } else {
        MovieModel.findByIdAndRemove(movieId)
          .then(() => res.send({ message: 'Фильм удалён успешно!' }));
      }
    })
    .catch(next);
};

module.exports = {
  getMovies, postMovie, deleteMovie,
};
