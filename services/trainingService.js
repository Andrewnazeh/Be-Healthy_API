const asyncHandler = require('express-async-handler');
const Training = require('../models/trainingModel');

exports.getTrainings = asyncHandler(async (req, res, next) => {
    
    const keyword = { ...req.query };
    console.log(keyword);
    const trainings = await Training.findOne( keyword ).select(['name','image']);

    res.status(200).json({
        success: true,
        data: trainings
    });
});

exports.getSpecificTraining = asyncHandler(async (req, res, next) => {

    const training = await Training.findById(req.params.id);

    res.status(200).json({
        success: true,
        data: training
    });
});