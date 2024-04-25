

const Data = require('../models/dataModel');
const asyncHandler = require('express-async-handler');

exports.collectData = asyncHandler(async (req, res, next) => {
    let BMR;
    const activityList = new Map();

    activityList.set('low', 1.2);
    activityList.set('medium', 1.55);
    activityList.set('high', 1.72);
    const {
        age,
        gender,
        weight,
        height,
        activity,
    } = req.body;
    if (gender === 'male') {
        BMR = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        BMR = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    const caloriesNeeded = BMR * activityList.get(activity);

    req.body.caloriesNeeded = Math.ceil(caloriesNeeded);
    const data = await Data.create(req.body);
    res.status(201).json({ data: data });
});


exports.addData = asyncHandler(async (req, res, next) => {
    const data = await Data.findByIdAndUpdate(req.params.id);
    data.caloriesAdded += parseFloat(req.body.caloriesAdded);
    data.stepsNumber += parseFloat(req.body.stepsNumber);
    data.waterQuantity += parseFloat(req.body.waterQuantity);
    await data.save();
    res.status(201).json({ data: data });
});


exports.getData = asyncHandler(async (req, res, next) => {
    const data = await Data.findById(req.params.id);
    res.status(200).json({ data: data });

})