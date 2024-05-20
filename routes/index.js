
const userRoute = require('./userRoute');
const authRoute = require('./authRoute');
const dataRoute= require('./dataRoute');
const foodRoute= require('./foodRoute');
const restaurantRoute= require('./restaurantRoute');
const catFoodRoute = require('./categoryFoodRoute');
const wishListRoute = require('./wishListRout');
const trainingRoute = require('./trainingRoute');
const reviewRoute = require('./reviewRoute');
const feedbackRoute = require('./feedbackRoute');

const mountRoutes = (app) => {
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/data', dataRoute);
  app.use('/api/v1/food', foodRoute);
  app.use('/api/v1/restaurants', restaurantRoute);
  app.use('/api/v1/catFood', catFoodRoute);
  app.use('/api/v1/wishlist', wishListRoute);
  app.use('/api/v1/training', trainingRoute);
  app.use('/api/v1/feedback', feedbackRoute);

};


module.exports = mountRoutes;
