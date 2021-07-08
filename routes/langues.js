const languesRoutes = require('express').Router();

const db = require('../db-config');

// Candidate's langue routes
languesRoutes.get('/:candidate_id/langues', (req, res) => {
  const candidateId = req.params.candidate_id;
  db.query('SELECT name, username, number, langueName FROM candidates JOIN candidate_langues ON candidates.id=candidate_langues.candidate_id ORDER BY name, username, number, langueName',
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

languesRoutes.post('/:candidate_id/langues', (req, res) => {
  const candidateLangues = {
    number: req.body.number,
    langueName: req.body.langueName,
  };
  const candidateId = req.params.candidate_id;
  db.query('INSERT INTO candidate_langues(number, langueName, candidate_id) VALUES (?, ?, ?)',
    [candidateLangues.number,
      candidateLangues.langueName,
      candidateId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error saving Candidate langue');
      } else {
        const updatedCandidateLangue = {
          id: results.insertId,
          candidateId,
          number: candidateLangues.number,
          langueName: candidateLangues.langueName,
        };
        res.status(201).send(updatedCandidateLangue);
      }
    });
});
module.exports = languesRoutes;
