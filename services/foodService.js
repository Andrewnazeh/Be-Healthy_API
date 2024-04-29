const asyncHandler = require('express-async-handler');


const Food = require('../models/foodModel');
const factory = require('./handlersFactory');



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
    
    if (keyword.name===undefined && keyword.categoryId===undefined) {
        return res.status(404).json({
            Result: food.length,
            success: true,
            data:"no food found"
        });
    } else {
         food = await Food.find({
            name: new RegExp(keyword.name, 'i'),
             categoryId: new RegExp(keyword.categoryId, 'i'),
        });
    }
   
res.status(200).json({
    Result: food.length,
    success: true,
    data: food
});

});