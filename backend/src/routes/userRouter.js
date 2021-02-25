const express = require('express');
const { signup, signin, requireSignin } = require('../controllers/userController')
const { validateSignupRequest, validateSigninRequest, isRequestValidate } = require('../validators/auth.js');
const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidate, signup);
router.post('/signin', validateSigninRequest, isRequestValidate, signin);

module.exports = router;
