const asyncHandler = require('express-async-handler');

const Restaurant = require('../models/restaurantModel');



exports.getListOfRestaurant=asyncHandler(async (req, res, next) => {
    const restaurants = await Restaurant.find().select(['name','image']);
    res.status(200).json({
        success: true,
        data:restaurants
        
        
    });
})


exports.getSpecificRestaurant=asyncHandler(async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.id);
    res.status(200).json({
        success: true,
        data: restaurant
    });
})