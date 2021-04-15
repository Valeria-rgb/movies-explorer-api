const router = require('express').Router();
const {
  getUserInfo, updateProfile,
} = require('../controllers/users');

router.get('/users/me', getUserInfo);
router.patch('/users/me', updateProfile);

module.exports = router;
