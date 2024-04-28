const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"name required"],
    },
    image: {
        type: String,
        required: [true,"image required"],
    },
    description: {
        type: String,
        required: [true,"description required"],
    },
    rate: {
        type: Number,
        required: [true,"rate required"],
    },
    link: {
        type: String,
        required: [true,"link required"],
    },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);