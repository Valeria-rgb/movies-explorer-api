const MovieModel = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const {
  badRequestErrorText, notFoundFilmErrorText, forbiddenErrorText, filmIsDeletedText,
} = require('../utils/errorTexts');

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
        throw new BadRequestError(badRequestErrorText);
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
        throw new NotFoundError(notFoundFilmErrorText);
      } else if (movie.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(forbiddenErrorText);
      } else {
        MovieModel.findByIdAndRemove(movieId)
          .then(() => res.send({ message: filmIsDeletedText }));
      }
    })
    .catch(next);
};

module.exports = {
  getMovies, postMovie, deleteMovie,
};
