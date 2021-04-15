const router = require('express').Router();
const auth = require('../middlewares/auth');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const { createUser } = require('../controllers/auth')

router.post('/signin');
router.post('/signup', createUser);

router.use('/', auth, moviesRouter);
router.use('/', auth, usersRouter);

module.exports = router;
