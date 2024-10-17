const express = require('express')
const authenticateToken = require('../middlewares/auth');
const IngredientController = require('../controllers/Ingredients')
const router = express.Router();

router.get('/', IngredientController.findAll);
router.post('/', IngredientController.create);

module.exports = router