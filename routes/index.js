const routes = require('express').Router();

// define the index route
routes.get('/', (req, res) => {
  console.log('A new request just hit the API !');
  res.send('Hello dear API client :)');
});

const userRoutes = require('./users');

routes.use('/users', userRoutes);

module.exports = routes;
