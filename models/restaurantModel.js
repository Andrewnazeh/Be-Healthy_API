const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
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
    rate: {
        type: Number,
        required: [true, "rate required"],
    },
    link: {
        type: String,
        required: [true, "link required"],
    },
    ratingsAverage: {
        type: Number,
        min: [1, 'Rating must be above or equal 1.0'],
        max: [5, 'Rating must be below or equal 5.0'],
        // set: (val) => Math.round(val * 10) / 10, // 3.3333 * 10 => 33.333 => 33 => 3.3
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
},
    {

        timestamps: true,
        // to enable virtual populate
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

restaurantSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'Restaurant',
    localField: '_id',
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