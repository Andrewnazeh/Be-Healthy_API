const asyncHandler = require('express-async-handler');
const Training = require('../models/trainingModel');

exports.getTrainings = asyncHandler(async (req, res, next) => {
    
    const keyword = { ...req.query };
    console.log(keyword);
    const trainings = await Training.find( keyword ).select(['name','image']);

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

exports.getTrainingFromPouplar = asyncHandler(async (req, res) => {
    const randomTraining = await Training.aggregate([{ $sample: { size: 5 } },{ "$project": {   _id: 1, "name": 1, "image": 1 ,"category":1} } ]);
    

    res.status(200).json({
        success: true,
        data: randomTraining
    });
})