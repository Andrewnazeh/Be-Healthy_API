const asyncHandler = require('express-async-handler');


const Food = require('../models/foodModel');
const ApiError = require('../utils/apiError');
const factory = require('./handlersFactory');
const { Result } = require('express-validator');



// @desc    Get list of foods
// @route   GET /api/v1/foods
// @access  Public
exports.getFoods = factory.getAll(Food);


// @desc    Get single food
// @route   GET /api/v1/foods/:id
// @access  Public
exports.getSpeceficFood = factory.getOne(Food);




exports.getSearchedFood = asyncHandler(async (req, res, next) => {
    const keyword = { ...req.query };
    let food;
    console.log(keyword.name, keyword.category);
    if (keyword.name===undefined && keyword.category===undefined) {
        return res.status(404).json({
            Result: food.length,
            success: true,
            data:"no food found"
        });
    } else {
         food = await Food.find({
            name: new RegExp(keyword.name, 'i'),
            category: new RegExp(keyword.category, 'i'),
        });
    }
   
res.status(200).json({
    Result: food.length,
    success: true,
    data: food
});

});