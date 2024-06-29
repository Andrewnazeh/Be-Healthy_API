const asyncHandler = require('express-async-handler');

const Training = require('../models/trainingModel');

exports.getTrainings = asyncHandler(async (req, res, next) => {

    const { category, level } = req.query;
    let query = {};

    // Build the query object based on provided search terms
    if (category && level) {
        const conditions = [];
        if (req.getLocale() === 'en') {
            conditions.push(
                { 'level.en': level },
                { 'category.en': category },
            );
        } else {
            conditions.push(
                { 'category.ar': category },
                { 'level.ar': level }
            );
        }

        query = { $and: conditions };
    } else if (category || level) {
        const conditions = [];
        if (category) {
            conditions.push(
                { 'category.en': category },
                { 'category.ar': category },
            );
        }
        if (level) {
            conditions.push(
                { 'level.en': level },
                { 'level.ar': level },

            );
        }
        query = { $or: conditions };
    }
    const trainings = await Training.find((!category && !level) ? {} : query).select(['name', 'image']);
    const translatedTrainings = trainings.map(items => {
        return {
            _id: items._id,
            name: items.name[req.getLocale()],
            image: items.image
        }
    });

    res.status(200).json({
        success: true,
        size: translatedTrainings.length,
        data: translatedTrainings
    });
});

exports.getSpecificTraining = asyncHandler(async (req, res, next) => {

    const training = await Training.findById(req.params.id);
    if (!training) {
        return next(new ApiError(`No training for this id ${req.params.id}`, 404));
    }

    const translatedTraining = {
        _id: training._id,
        name: training.name[req.getLocale()],
        description: training.description ? training.description[req.getLocale()] : null,
        level: training.level ? training.level[req.getLocale()] : null,
        image: training.image,
        link: training.link,
        category: training.category[req.getLocale()]
    }
    res.status(200).json({
        success: true,
        data: translatedTraining
    });
});

exports.getTrainingFromPouplar = asyncHandler(async (req, res) => {
    const randomTraining = await Training.aggregate([
        {
            $sample: { size: 5 }
        }
    ]);

    const translatedTrainings = randomTraining.map(items => {
        return {
            _id: items._id,
            name: items.name[req.getLocale()],
            image: items.image,
            category: items.category[req.getLocale()]
        }
    });

    res.status(200).json({
        success: true,
        data: translatedTrainings
    });
})

exports.getallTrainings = asyncHandler(async (req, res) => {

    const trainings = await Training.find().select(['name', 'image']);
    const translatedTrainings = trainings.map(items => {
        return {
            _id: items._id,
            name: items.name[req.getLocale()],
            image: items.image
        }
    })


    res.status(200).json({
        success: true,
        data: translatedTrainings

    });
})

exports.getMeditation = asyncHandler(async (req, res) => {

    const meditations = await Training.find({
        '$or': [{ 'category.en': 'Meditation' },
        { 'category.ar': 'تامل' }]
    }).select(['name', 'image', 'link']);

    const translatedMeditations = meditations.map(items => {
        return {
            _id: items._id,
            name: items.name[req.getLocale()],
            image: items.image,
            link: items.link
        }
    })

    res.status(200).json({
        success: true,
        data: translatedMeditations

    });

})