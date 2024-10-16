const express = require('express')
const MenuController = require('../controllers/Menu')
const router = express.Router();

router.post('/', MenuController.create);

module.exports = router