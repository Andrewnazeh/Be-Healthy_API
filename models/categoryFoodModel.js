const mongoose = require('mongoose');

const catFoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name required"],
    },
    image: {
        type: String,
        required: [true, "image required"],
    }
    

});

module.exports = mongoose.model("CatFood", catFoodSchema);