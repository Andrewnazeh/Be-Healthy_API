

const CatFood = require('../models/categoryFoodModel');
const factory = require('./handlersFactory');



// @desc    Get list of CatFood
// @route   GET /api/v1/catFood
// @access  Public
exports.getCategoryFoods = async (req, res, next) => {
    const catFoods = await CatFood.find({});

    // const translatedResults = catFoods.map(item => {
    //     item.name = req.__(item.name); // Translate the name field
    //     return item;
    // });
    // var language = req.getlocale();

    const dataTranslated =catFoods.map( item =>({
        name: item.name[req.getLocale()],
            image: item.image,
            _id: item._id,
    }));

    res.status(200).json({
        status: 'success',
        results: catFoods.length,
        dataTranslated
    })
}
    // factory.getAll(CatFood);