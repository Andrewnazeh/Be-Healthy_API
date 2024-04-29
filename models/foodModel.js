const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name required"],
    },
    categoryId: {
        type: String,
        required: [true, "category required"],
    },
    calorie: {
        type: String,
        required: [true, "calorie required"],
    },
    
});

module.exports = mongoose.model("Food", foodSchema);