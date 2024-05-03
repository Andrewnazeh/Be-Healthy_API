const express = require('express');

const { getTrainings,getSpecificTraining  } =
    require('../services/trainingService');



const Router = express.Router();

Router.get('/', getTrainings);
Router.get('/:id', getSpecificTraining);


module.exports = Router;

