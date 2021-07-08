const routes = require('express').Router();

const userRoutes = require('./users');
const screenRoutes = require('./screen');
const loginRoute = require('./login');
const softskillRoutes = require('./softskills');
const hardSkillsRoutes = require('./hardSkills');
const myValuesRoutes = require('./values');
const languesRoutes = require('./langues');
const recommendationsRoutes = require('./recommendations');
const whatElseRoutes = require('./whatelse');

routes.use('/users', userRoutes);
routes.use('/screen', screenRoutes);
routes.use('/login', loginRoute);
routes.use('/screen', softskillRoutes);
routes.use('/screen', hardSkillsRoutes);
routes.use('/screen', myValuesRoutes);
routes.use('/screen', languesRoutes);
routes.use('/screen', recommendationsRoutes);
routes.use('/screen', whatElseRoutes);

// define the index route
routes.get('/', (req, res) => {
  console.log('A new request just hit the API !');
  res.send('Hello dear API client :)');
});

module.exports = routes;
