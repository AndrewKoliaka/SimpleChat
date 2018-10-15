const express = require('express');
const authContoller = require('../controllers/authController');
const router = express.Router();

router.post('/login', authContoller.authLogin);
router.post('/register', authContoller.authRegister);

module.exports = router;
