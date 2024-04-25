const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    userID:
    {   type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        require: [true, "you must insert gender"],

    },
    weight: {
        type: Number,
        require: [true, "you must insert weight"],
    },
    height:
    {
        type: Number,
        require: [true, "you must insert height"],
    },
    age:
    {
        type: Number,
        require: [true, "you must insert age"],
    },
    activity:
    {
        type: String,
        enum: ['low', 'medium', 'high'],
        require: [true, "you must insert activity"],
    },
    caloriesNeeded: {
        type: Number,
        default:0
    },

    caloriesAdded: {
        type: Number,
        default: 0
    },
    stepsNumber: {
        type: Number,
        default: 0
    },    
    waterQuantity: {
        type: Number,
        default: 0
    },


}, { timestamps: true }
); 

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
