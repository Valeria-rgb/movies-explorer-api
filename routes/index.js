const router = require('express').Router();
const auth = require('../middlewares/auth');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const dontExistRouter = require('./dontexist');
const { createUser, login } = require('../controllers/auth');
const { signupValidator, signinValidator } = require('../middlewares/validators');

router.post('/signin', signinValidator, login);
router.post('/signup', signupValidator, createUser);

router.use('/', auth, moviesRouter);
router.use('/', auth, usersRouter);
router.use('/*', auth, dontExistRouter);

module.exports = router;
