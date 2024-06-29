const express = require('express');

const { getTrainings, getTrainingFromPouplar,getSpecificTraining,getallTrainings ,getMeditation } =
    require('../services/trainingService');



const Router = express.Router();

Router.get('/', getTrainings);
Router.get('/all', getallTrainings);
Router.get('/meditation', getMeditation);
Router.get('/pouplar', getTrainingFromPouplar);
Router.get('/:id', getSpecificTraining);


module.exports = Router;

