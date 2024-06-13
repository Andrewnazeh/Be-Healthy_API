const cron = require('node-cron');

const Data = require('../models/dataModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

exports.collectData = asyncHandler(async (req, res, next) => {

    const user = await User.findByIdAndUpdate({ _id: req.body.userId }, { haveData: true });

    if (!user) {
        return next(new ApiError(`No user found`, 404));
    } else if (user.haveData) {
        return (
            res.status(409).json({ message: 'Data Already Created' })
        )
    }
    else {
        const data = await Data.create(req.body);
        res.status(201).json({ data: data });
    }
});


exports.addData = asyncHandler(async (req, res, next) => {
    const data = await Data.findOne({ userId: req.user.id }).populate('userId');
    const { caloriesAdded = 0, stepsNumber = 0, waterQuantity = 0 } = req.body;
    data.caloriesAdded += parseFloat(caloriesAdded);
    data.stepsNumber += parseFloat(stepsNumber);
    data.waterQuantity += parseFloat(waterQuantity);
    await data.save();

    // Function to reset the variables to 0
    resetVariables = async () => {
        const data = await Data.find({ userId: req.user.id });
        data.caloriesAdded = 0;
        data.stepsNumber = 0;
        data.waterQuantity = 0;
        await data.save();
    }

    // Schedule the task to run every 24 hours
    cron.schedule('0 0 * * *', () => {
        console.log('Running update task...');
        resetVariables();
    }, {
        timezone: 'Africa/Cairo'
    });
    res.status(200).json({ data });
});




exports.getData = asyncHandler(async (req, res, next) => {
    const data = await Data.findOne({ userId: req.user.id }).populate('userId');
    res.status(200).json({ data: data });

})

exports.updateData = asyncHandler(async (req, res) => {
    const data = await Data.findOneAndUpdate({ userId: req.user.id }, req.body, { new: true });
    res.status(200).json(data);

});
