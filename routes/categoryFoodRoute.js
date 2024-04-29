const express = require('express');


const { getCategoryFoods,  } = require('../services/categoryFoodService');


const router = express.Router();

router.get('/', getCategoryFoods);



module.exports = router;

