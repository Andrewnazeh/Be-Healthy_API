const mongoose = require('mongoose');


const trainingSchema = new mongoose.Schema({
    name: {
        type: Object,
        required: [true, "name required"],
    },
    image: {
        type: String,
        required: [true, "image required"],
    },
    description: {
        type: Object,
        required: [true, "description required"],
    },
    link: {
        type: String,
        required: [true, "link required"],
    },
    category: {
        type: Object,
        enum: ['strength', 'stretching', 'cardio', 'yoga', 'قوة', 'الاطالة', 'اليوغا','كارديو'],
        required: [true, "category required"],
    },
    level: {
        type: Object,
        enum: ['beginner', 'advanced', 'متقدم','مبتدئ'],
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