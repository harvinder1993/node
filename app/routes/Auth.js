const express = require('express');
const AuthController = require('../controllers/Auth');
const router = express.Router();

router.post('/login', AuthController.login);
router.post('/verify', AuthController.verifyCodeAndLogin);

module.exports = router;
