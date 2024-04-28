
const userRoute = require('./userRoute');
const authRoute = require('./authRoute');
const dataRoute= require('./dataRoute');
const foodRoute= require('./foodRoute');
const restaurantRoute= require('./restaurantRoute');

const mountRoutes = (app) => {
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/data', dataRoute);
  app.use('/api/v1/food', foodRoute);
  app.use('/api/v1/restaurants', restaurantRoute);
};


module.exports = mountRoutes;
