const languesRoutes = require('express').Router();

const db = require('../db-config');

languesRoutes.get('/', (req, res) => {
  db.query('SELECT * FROM langues', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200).json(results);
    }
  });
});

languesRoutes.get('/:id', (req, res) => {
  db.query('SELECT * FROM langues WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200).json(results[0]);
    }
  });
});

module.exports = languesRoutes;
