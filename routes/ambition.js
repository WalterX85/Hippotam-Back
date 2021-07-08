const ambitionRoutes = require('express').Router();

const db = require('../db-config');

// Candidate's ambition routes
ambitionRoutes.get('/:candidate_id/ambition', (req, res) => {
  const candidateId = req.params.candidate_id;
  db.query('SELECT name, username, number, ambition FROM candidates JOIN candidate_ambition ON candidates.id=candidate_ambition.candidate_id ORDER BY name, username, number, ambition',
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

ambitionRoutes.post('/:candidate_id/ambition', (req, res) => {
  const candidateId = req.params.candidate_id;
  const candidateAmbition = {
    number: req.body.number,
    ambition: req.body.ambition,
  };
  db.query('SELECT ambition FROM candidate_ambition WHERE candidate_id = ? AND number = ?',
    [candidateId, candidateAmbition.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error selecting the candidate ambition');
      } else {
        const ambitionFromDB = selectResults[0];
        if (ambitionFromDB) {
          const ambitionToUpdate = req.body;
          db.query('UPDATE candidate_ambition SET ambition = ? WHERE candidate_id = ? AND number = ?', [candidateAmbition.ambition, candidateId, candidateAmbition.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the candidate ambition');
            } else {
              const updated = { ...ambitionFromDB, ...ambitionToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query('INSERT INTO candidate_ambition(number, ambition, candidate_id) VALUES (?, ?, ?)',
            [candidateAmbition.number,
              candidateAmbition.ambition,
              candidateId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error saving Candidate ambition');
              } else {
                const updatedCandidateAmbition = {
                  id: insertResults.insertId,
                  candidateId,
                  number: candidateAmbition.number,
                  ambition: candidateAmbition.ambition,
                };
                res.status(201).send(updatedCandidateAmbition);
              }
            });
        }
      }
    });
});

ambitionRoutes.delete('/:candidate_id/ambition/:number', (req, res) => {
  db.query('DELETE FROM candidate_ambition WHERE candidate_id = ? AND number = ?', [req.params.candidate_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a candidate ambition');
    } else if (results.affectedRows) res.status(200).send(' 🎉candidate ambition deleted');
    else res.status(404).send('candidate ambition not found');
  });
});

module.exports = ambitionRoutes;
