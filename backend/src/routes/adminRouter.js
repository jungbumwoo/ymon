const express = require('express');
const { signin, signup, requireSignin } = require('../controllers/adminController');
const router = express.Router();

router.post('/admin/signin', signin);
router.post('/admin/signup', signup);

module.exports = router;