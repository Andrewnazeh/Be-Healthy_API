const express = require('express');

const { getTrainings, getTrainingFromPouplar,getSpecificTraining  } =
    require('../services/trainingService');



const Router = express.Router();

Router.get('/', getTrainings);
Router.get('/pouplar', getTrainingFromPouplar);
Router.get('/:id', getSpecificTraining);


module.exports = Router;

