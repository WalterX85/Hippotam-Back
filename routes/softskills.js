const softskillRoutes = require('express').Router();

const db = require('../db-config');

softskillRoutes.get('/', (req, res) => {
  db.query('SELECT * FROM softskills', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200).json(results);
    }
  });
});

softskillRoutes.get('/:id', (req, res) => {
  db.query('SELECT * FROM softskills WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200).json(results[0]);
    }
  });
});

module.exports = softskillRoutes;
