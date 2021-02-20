const express = require('express');
const { signin, signup, requireSignin } = require('../controllers/adminController');
const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

module.exports = router;