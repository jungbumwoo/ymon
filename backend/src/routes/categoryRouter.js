const express = require('express');
const { requireSignin, adminMiddleware} = require('../middlewares');
const { addCategory, getCategory } = require('../controllers/categoryController');
const router = express.Router();

router.post('/category/create', requireSignin, adminMiddleware, addCategory);
router.get('/category/getcategory', getCategory);


module.exports = router;