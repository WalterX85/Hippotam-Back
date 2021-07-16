const routes = require('express').Router();
const express = require('express');

const userRoutes = require('./users');
const screenRoutes = require('./screen');
const loginRoute = require('./login');
const softskillRoutes = require('./softskills');
const hardSkillsRoutes = require('./hardSkills');
const myValuesRoutes = require('./values');
const languesRoutes = require('./langues');
const recommendationsRoutes = require('./recommendations');
const formationRoutes = require('./formation');
const diplomeRoutes = require('./diplome');
const lastJobRoutes = require('./lastjob');
const strengthRoutes = require('./strength');
const ambitionRoutes = require('./ambition');
const popRoutes = require('./pop');
const photoRoutes = require('./photo');
const uploadRoutes = require('./upload');

routes.use('/users', userRoutes);
routes.use('/screen', screenRoutes);
routes.use('/login', loginRoute);
routes.use('/screen', softskillRoutes);
routes.use('/screen', hardSkillsRoutes);
routes.use('/screen', myValuesRoutes);
routes.use('/screen', languesRoutes);
routes.use('/screen', recommendationsRoutes);
routes.use('/screen', formationRoutes);
routes.use('/screen', diplomeRoutes);
routes.use('/screen', lastJobRoutes);
routes.use('/screen', strengthRoutes);
routes.use('/screen', ambitionRoutes);
routes.use('/screen', popRoutes);
routes.use('/screen', photoRoutes);
routes.use('/upload', uploadRoutes);
routes.use('/uploads', express.static(`${__dirname}/public/photos`));

// define the index route
routes.get('/', (req, res) => {
  console.log('A new request just hit the API !');
  res.send('Hello dear API client :)');
});

module.exports = routes;
