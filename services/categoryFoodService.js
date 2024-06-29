const asyncHandler = require('express-async-handler');

const ApiError = require('../utils/apiError');
const CatFood = require('../models/categoryFoodModel');



// @desc    Get list of CatFood
// @route   GET /api/v1/catFood
// @access  Public
exports.getCategoryFoods = asyncHandler(async (req, res, next) => {
    let filter = {};
    if (req.filterObj) {
        filter = req.filterObj;
    }
    const catFoods = await CatFood.find(filter);
    if (!catFoods) {
        return next(new ApiError('No catFoods found', 404));
    }
    const translatedItems = catFoods.map(item => ({
        _id: item._id,
        name: item.name[req.getLocale()],
        image: item.image
    }));
    
    res.status(200).json({
        status: 'success',
        results: translatedItems.length,
        data: translatedItems
    })
})