const express = require('express');
const { signup } = require('../controllers/userController')
const router = express.Router();


router.get('/get', (req, res) => {
    res.render('hi')
})
router.post('/signup', signup);

router.post('/signin', (req, res) => {

})

module.exports = router;
