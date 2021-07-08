const whatElseRoutes = require('express').Router();

// Candidate's what else routes

const db = require('../db-config');

// Candidate's langue routes
whatElseRoutes.get('/:candidate_id/whatelse', (req, res) => {
  const candidateId = req.params.candidate_id;
  db.query('SELECT name, username, number, diplome, formation, lastJob FROM candidates JOIN candidate_whatElse ON candidates.id=candidate_whatElse.candidate_id ORDER BY name, username, number, name, diplome, formation, lastJob',
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

whatElseRoutes.post('/:candidate_id/whatelse', (req, res) => {
  const candidateId = req.params.candidate_id;
  const candidateWhatElse = {
    number: req.body.number,
    diplome: req.body.diplome,
    formation: req.body.formation,
    lastJob: req.body.lastJob,
  };
  db.query('SELECT * FROM candidate_whatElse WHERE candidate_id = ? AND number = ?',
    [candidateId, candidateWhatElse.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error saving Candidate what else');
      } else {
        const whatElseFromDB = selectResults[0];
        if (whatElseFromDB) {
          const whatElseToUpdate = req.body;
          db.query('UPDATE candidate_whatElse SET candidateWhatElse = ? WHERE candidate_id = ? AND number = ?', [candidateWhatElse, candidateId, candidateWhatElse.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the Candidate whatelse');
            } else {
              const updated = { ...whatElseFromDB, ...whatElseToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query('INSERT INTO candidate_whatElse(number, diplome, formation, lastJob, candidate_id) VALUES (?, ?, ?, ?, ?)',
            [candidateWhatElse.number,
              candidateWhatElse.diplome,
              candidateWhatElse.formation,
              candidateWhatElse.lastJob,
              candidateId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error saving Candidate value');
              } else {
                const updatedCandidateWhatElse = {
                  id: insertResults.insertId,
                  candidateId,
                  diplome: candidateWhatElse.diplome,
                  formation: candidateWhatElse.formation,
                  lastJob: candidateWhatElse.lastJob,
                };
                res.status(201).send(updatedCandidateWhatElse);
              }
            });
        }
      }
    });
});

whatElseRoutes.delete('/:candidate_id/whatelse/:number', (req, res) => {
  db.query('DELETE FROM candidate_whatElse WHERE candidate_id = ? AND number = ?', [req.params.candidate_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a candidate what else');
    } else if (results.affectedRows) res.status(200).send(' 🎉candidate what else deleted');
    else res.status(404).send('candidate what else not found');
  });
});

module.exports = whatElseRoutes;
