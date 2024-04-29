const asyncHandler = require('express-async-handler');


const Food = require('../models/foodModel');
const factory = require('./handlersFactory');
const ApiError = require('../utils/apiError');



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

    const food = await Food.find({
        name: new RegExp(keyword.name, 'i'),
        categoryId: new RegExp(keyword.categoryId, 'i'),
    });
    if (food&&food.length === 0) {
        return next(new ApiError('No food for this name', 404));
    } else {
        res.status(200).json({
            Result: food.length,
            success: true,
            data: food
        });
    }
});