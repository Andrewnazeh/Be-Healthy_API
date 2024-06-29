const asyncHandler = require('express-async-handler');


const Food = require('../models/foodModel');
const factory = require('./handlersFactory');
const ApiError = require('../utils/apiError');



// @desc    Get list of foods
// @route   GET /api/v1/foods
// @access  Public
exports.getFoods = asyncHandler(async (req, res) => {
    const foods = await Food.find({});
    if (!foods) {
        return next(new ApiError('No food found', 404));
    }
    const translatedItems = foods.map(item => ({
        _id: item._id,
        name: item.name[req.getLocale()],
        calorie: item.calorie
    }));
    res.status(200).json({
        status: 'success',
        results: translatedItems.length,
        data: translatedItems
    })
})


// @desc    Get single food
// @route   GET /api/v1/foods/:id
// @access  Public
exports.getSpeceficFood = factory.getOne(Food);




exports.getSearchedFood = asyncHandler(async (req, res, next) => {
    const keyword = { ...req.query };

    const food = await Food.find({
        '$or': [
            {'name.en': new RegExp(keyword.name, 'i')},
            {'name.ar': new RegExp(keyword.name, 'i')}
        ],
        categoryId: new RegExp(keyword.categoryId, 'i')

       
    });
    if (food&&food.length === 0) {
        return next(new ApiError('No food for this name', 404));
    } else {
        const translatedFood = food.map(item => {
            return {
                _id: item._id,
                name: item.name[req.getLocale()],
                calorie: item.calorie
            }
        })
        res.status(200).json({
            Result: food.length,
            success: true,
            data: translatedFood
        });
    }
});