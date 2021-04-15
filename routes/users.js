const router = require('express').Router();
const {
  getUserInfo, updateProfile,
} = require('../controllers/users');
const { updateProfileValidator } = require('../middlewares/validators');

router.get('/users/me', getUserInfo);
router.patch('/users/me', updateProfileValidator, updateProfile);

module.exports = router;
