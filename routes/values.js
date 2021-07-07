const myValuesRoutes = require('express').Router();

const db = require('../db-config');

// Candidate's value routes
myValuesRoutes.get('/:candidate_id/values', (req, res) => {
  const candidateId = req.params.candidate_id;
  db.query('SELECT name, username, number, valueName FROM candidates JOIN candidate_value ON candidates.id=candidate_value.candidate_id ORDER BY name, username, number, valueName',
    [candidateId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).json(results);
      }
    });
});

myValuesRoutes.post('/:candidate_id/values', (req, res) => {
  const candidateValue = {
    number: req.body.number,
    valueName: req.body.valueName,
  };
  const candidateId = req.params.candidate_id;
  db.query('INSERT INTO candidate_value(number, valueName, candidate_id) VALUES (?, ?, ?)',
    [candidateValue.number, candidateValue.valueName, candidateId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error saving Candidate value');
      } else {
        const updatedCandidateValue = {
          id: results.insertId,
          candidateId,
          number: candidateValue.number,
          valueName: candidateValue.valueName,
        };
        res.status(201).send(updatedCandidateValue);
      }
    });
});

module.exports = myValuesRoutes;
