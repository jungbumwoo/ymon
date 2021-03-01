const express = require('express');
const { initialData } = require('../../controllers/admin/initialData.js');
const router = express.Router();

router.post('/initialdata', initialData);

module.exports = router;