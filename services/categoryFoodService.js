

const CatFood = require('../models/categoryFoodModel');
const factory = require('./handlersFactory');



// @desc    Get list of CatFood
// @route   GET /api/v1/catFood
// @access  Public
exports.getCategoryFoods = factory.getAll(CatFood);