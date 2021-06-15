const softskillsRoutes = require('express').Router();

const connection = require('../db-config');

softskillsRoutes.get('/softskills', (req, res) => {
  connection.query('SELECT * fROM softskills', (err, results) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).json(results);
    }
  });
});

softskillsRoutes.get('/:id', (req, res) => {
  connection.query('SELECT * FROM softskills WHERE id = ?', (errId, resultsId) => {
    if (errId) {
      res.status(500);
    } else {
      res.status(200).json(resultsId);
    }
  });
});
