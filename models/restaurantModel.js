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
const setImageURL = (doc) => {
    if (doc.image) {
        const imageUrl = `${process.env.BASE_URL}/restaurants/${doc.image}`;
        doc.image = imageUrl;
    }
    if (doc.images) {
        const imagesList = [];
        doc.images.forEach((image) => {
            const imageUrl = `${process.env.BASE_URL}/restaurants/${image}`;
            imagesList.push(imageUrl);
        });
        doc.images = imagesList;
    }
};
// findOne, findAll and update
restaurantSchema.post('init', (doc) => {
    setImageURL(doc);
});

// create
restaurantSchema.post('save', (doc) => {
    setImageURL(doc);
});


module.exports = mongoose.model("Restaurant", restaurantSchema);