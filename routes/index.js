const routes = require('express').Router();

const userRoutes = require('./users');
const screenRoutes = require('./screen');
const loginRoute = require('./login');

routes.use('/users', userRoutes);
routes.use('/screen', screenRoutes);
routes.use('/login', loginRoute);

// define the index route
routes.get('/', (req, res) => {
  console.log('A new request just hit the API !');
  res.send('Hello dear API client :)');
});

module.exports = routes;
