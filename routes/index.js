
const userRoute = require('./userRoute');
const authRoute = require('./authRoute');
const dataRoute= require('./dataRoute');

const mountRoutes = (app) => {
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/data', dataRoute);
};

module.exports = mountRoutes;
