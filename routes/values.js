const myValuesRoutes = require('express').Router();

const db = require('../db-config');

myValuesRoutes.get('/', (req, res) => {
  db.query('SELECT * FROM my_values', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200).json(results);
    }
  });
});

myValuesRoutes.get('/:id', (req, res) => {
  db.query('SELECT * FROM my_values WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200).json(results[0]);
    }
  });
});

module.exports = myValuesRoutes;
