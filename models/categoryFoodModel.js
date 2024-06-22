const mongoose = require('mongoose');

const catFoodSchema = new mongoose.Schema({
    name: {
        type: Object,
        required: [true, "name required"],
    },
    image: {
        type: String,
        required: [true, "image required"],
    }


});

const setImageURL = (doc) => {
    if (doc.image) {
        const imageUrl = `${process.env.BASE_URL}/categoryFoods/${doc.image}`;
        doc.image = imageUrl;
    }
    if (doc.images) {
        const imagesList = [];
        doc.images.forEach((image) => {
            const imageUrl = `${process.env.BASE_URL}/categoryFoods/${image}`;
            imagesList.push(imageUrl);
        });
        doc.images = imagesList;
    }
};
// findOne, findAll and update
catFoodSchema.post('init', (doc) => {
    setImageURL(doc);
});

// create
catFoodSchema.post('save', (doc) => {
    setImageURL(doc);
});

module.exports = mongoose.model("CatFood", catFoodSchema);