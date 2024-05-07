

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
    const waterNeeded = 0.035 * weight;
    req.body.caloriesNeeded = Math.ceil(caloriesNeeded);
    req.body.waterNeeded = parseFloat(waterNeeded.toFixed(1));
    req.body.userId = req.user.id;
    const data = await Data.create(req.body);
    res.status(201).json({ data: data });
});


exports.addData = asyncHandler(async (req, res, next) => {
    const data = await Data.findOne({userId:req.user.id}).populate('userId');
    data.caloriesAdded += parseFloat(req.body.caloriesAdded);
    data.stepsNumber += parseFloat(req.body.stepsNumber);
    data.waterQuantity += parseFloat(req.body.waterQuantity);
    await data.save();

    setInterval(async()=>{
        data.caloriesAdded = 0,
        data.stepsNumber = 0,
        data.waterQuantity = 0
        await data.save();
    }
        , 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    // if ((data.timeChangedData)===Date.now()) {
    //     data.caloriesAdded = 0;
    //     data.stepsNumber = 0;
    //     data.waterQuantity = 0;
    //     data.timeChangedData = Date.now();
    //     await data.save();
    // }
    res.status(201).json({ data: data });
});


exports.getData = asyncHandler(async (req, res, next) => {
    const data = await Data.findOne({userId:req.user.id}).populate('userId');
    res.status(200).json({ data: data });

})