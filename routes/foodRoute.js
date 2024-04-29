const express = require('express');


const { getSpeceficFood, getFoods, getSearchedFood } = require('../services/foodService');

const router = express.Router();

router.get('/search', getSearchedFood);
router.get('/:id', getSpeceficFood);
router.get('/', getFoods);


module.exports = router;

