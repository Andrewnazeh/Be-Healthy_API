const express = require('express');

const { getListOfRestaurant, getSpecificRestaurant } = require('../services/restaurantService');



const Router = express.Router();

Router.get('/', getListOfRestaurant);
Router.get('/:id', getSpecificRestaurant);


module.exports = Router;

