const router = require('express').Router();
const auth = require('../middlewares/auth');
const moviesRouter = require('./movies');
const usersRouter = require('./users');

router.post('/signin');
router.post('/signup');

router.use(auth);

router.use('/', moviesRouter);
router.use('/', usersRouter);

module.exports = router;
