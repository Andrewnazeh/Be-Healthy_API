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
    category: {
        type: String,
        enum:['strength','stretching','cardio','yoga'],
        required: [true, "category required"],
    },
    level: {
        type: String,
        enum: ['beginner', 'advanced'],
        required: [true, "level required"],
    }
});

const setImageURL = (doc) => {
    if (doc.image) {
        const imageUrl = `${process.env.BASE_URL}/trainings/${doc.image}`;
        doc.image = imageUrl;
    }
    if (doc.images) {
        const imagesList = [];
        doc.images.forEach((image) => {
            const imageUrl = `${process.env.BASE_URL}/trainings/${image}`;
            imagesList.push(imageUrl);
        });
        doc.images = imagesList;
    }
};
// findOne, findAll and update
trainingSchema.post('init', (doc) => {
    setImageURL(doc);
});

// create
trainingSchema.post('save', (doc) => {
    setImageURL(doc);
});


module.exports =mongoose.model('Trainning', trainingSchema);