const softskillRoutes = require('express').Router();

const db = require('../db-config');

// Candidate's soft skills routes
softskillRoutes.get('/:candidate_id/softskills', (req, res) => {
  const candidateId = req.params.candidate_id;
  db.query('SELECT name, username, number, softskills FROM candidates JOIN candidate_softskill ON candidates.id=candidate_softskill.candidate_id  ORDER BY name, username, number, softskills',
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

softskillRoutes.post('/:candidate_id/softskills', (req, res) => {
  const candidateSkills = {
    number: req.body.number,
    softskills: req.body.softskills,
  };
  const candidateId = req.params.candidate_id;
  db.query('INSERT INTO candidate_softskill(number, softskills, candidate_id) VALUES (?, ?, ?)',
    [candidateSkills.number, candidateSkills.softskills, candidateId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error saving Candidate softskills');
      } else {
        const updatedCandidateSkills = {
          id: results.insertId,
          candidateId,
          number: candidateSkills.number,
          softskills: candidateSkills.softskills,
        };
        res.status(201).send(updatedCandidateSkills);
      }
    });
});

module.exports = softskillRoutes;
