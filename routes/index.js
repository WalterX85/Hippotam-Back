const routes = require('express').Router();

const userRoutes = require('./users');
const screenRoutes = require('./screen');
const loginRoute = require('./login');
const softskillRoutes = require('./softskills');
const hardSkillsRoutes = require('./hardSkills');
const myValuesRoutes = require('./values');

routes.use('/users', userRoutes);
routes.use('/screen', screenRoutes);
routes.use('/login', loginRoute);
routes.use('/softskills', softskillRoutes);
routes.use('/hardSkills', hardSkillsRoutes);
routes.use('/values', myValuesRoutes);

// define the index route
routes.get('/', (req, res) => {
  console.log('A new request just hit the API !');
  res.send('Hello dear API client :)');
});

module.exports = routes;
