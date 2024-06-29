const asyncHandler = require('express-async-handler');

const Training = require('../models/trainingModel');

exports.getTrainings = asyncHandler(async (req, res, next) => {

    const keyword = { ...req.query };
    
    // const { category, level } = req.query;
    // console.log(category);
    //     let query = {};

    //     // Build the query object based on provided search terms
    //     if (category || level) {
    //         const conditions = [];
    //         if (category) {
    //             conditions.push(
    //                 { 'level.en': keyword.level },
    //                 { 'level.ar': keyword.level },
    //                 { 'category.en': keyword.category },
    //                 { 'category.ar': keyword.category },
    //             );
    //         }
    //         if (level) {
    //             // const regex2 = new RegExp(search2, 'i'); // Case-insensitive regex
    //             conditions.push(
    //                 { 'level.en': keyword.level },
    //                 { 'level.ar': keyword.level },
    //                 { 'category.en': keyword.category },
    //                 { 'category.ar': keyword.category },
    //             );
    //         }
    //         query = { $and: conditions };
    //     }
    const query = {
        '$and':[

           { '$or': [
                { 'level.en': keyword.level },
                { 'level.ar': keyword.level },

            ]},
           { '$or': [
                { 'category.en': keyword.category },
                { 'category.ar': keyword.category },

            ]}
        ]
                
                
    };


    const trainings = await Training.find(query).select(['name', 'image']);
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
        description:training.description? training.description[req.getLocale()]: null,
        level:training.level? training.level[req.getLocale()]: null,
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