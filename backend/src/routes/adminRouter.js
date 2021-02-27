const express = require('express');
const { signin, signup, signout } = require('../controllers/adminController');
const { requireSignin } = require('../middlewares');
const router = express.Router();

router.post('/admin/signin', signin);
router.post('/admin/signup', signup);
router.post('/admin/signout', signout);

module.exports = router;