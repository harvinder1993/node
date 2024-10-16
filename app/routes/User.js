const express = require('express')
const authenticateToken = require('../middlewares/auth');
const UserController = require('../controllers/User')
const router = express.Router();

router.get('/', authenticateToken, UserController.findAll);
router.get('/:id', UserController.findOne);
router.post('/', UserController.create);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.destroy);
module.exports = router