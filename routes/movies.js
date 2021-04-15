const router = require('express').Router();
const {
  getMovies, postMovie, deleteMovie,
} = require('../controllers/movies');
const { postMovieValidator } = require('../middlewares/validators');

router.get('/movies', getMovies);
router.post('/movies', postMovieValidator, postMovie);
router.delete('/movies/movieId', deleteMovie);

module.exports = router;
