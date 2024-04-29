const mongoose = require('mongoose');


const trainingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name required"],
    },
    image: {
        type: String,
        required: [true, "image required"],
    },
    description: {
        type: String,
        required: [true, "description required"],
    },
    link: {
        type: String,
        required: [true, "link required"],
    },
});

const training = mongoose.model('Trainning', trainingSchema);