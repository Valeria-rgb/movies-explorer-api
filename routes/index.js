const router = require('express').Router();
const auth = require('../middlewares/auth');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const { createUser, login } = require('../controllers/auth')

router.post('/signin', login);
router.post('/signup', createUser);

router.use('/', auth, moviesRouter);
router.use('/', auth, usersRouter);

module.exports = router;
