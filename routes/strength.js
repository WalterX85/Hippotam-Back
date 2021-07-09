const strengthRoutes = require('express').Router();

const db = require('../db-config');
const { verifyToken } = require('../middlewares/auth');

// Candidate's ambition routes
strengthRoutes.get('/:candidate_id/strength', (req, res) => {
  const candidateId = req.params.candidate_id;
  db.query('SELECT name, username, number, strength FROM candidates JOIN candidate_strength ON candidates.id=candidate_strength.candidate_id ORDER BY name, username, number, strength',
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

strengthRoutes.post('/:candidate_id/strength', verifyToken, (req, res) => {
  const candidateId = req.params.candidate_id;
  const candidateStrength = {
    number: req.body.number,
    strength: req.body.strength,
  };
  db.query('SELECT strength FROM candidate_strength WHERE candidate_id = ? AND number = ?',
    [candidateId, candidateStrength.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error selecting the candidate strength');
      } else {
        const strengthFromDB = selectResults[0];
        if (strengthFromDB) {
          const strengthToUpdate = req.body;
          db.query('UPDATE candidate_strength SET strength = ? WHERE candidate_id = ? AND number = ?', [candidateStrength.strength, candidateId, candidateStrength.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the candidate strength');
            } else {
              const updated = { ...strengthFromDB, ...strengthToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query('INSERT INTO candidate_strength(number, strength, candidate_id) VALUES (?, ?, ?)',
            [candidateStrength.number,
              candidateStrength.strength,
              candidateId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error saving Candidate strength');
              } else {
                const updatedCandidateStrength = {
                  id: insertResults.insertId,
                  candidateId,
                  number: candidateStrength.number,
                  strength: candidateStrength.strength,
                };
                res.status(201).send(updatedCandidateStrength);
              }
            });
        }
      }
    });
});

strengthRoutes.delete('/:candidate_id/strength/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM candidate_strength WHERE candidate_id = ? AND number = ?', [req.params.candidate_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a candidate strength');
    } else if (results.affectedRows) res.status(200).send(' 🎉candidate strength deleted');
    else res.status(404).send('candidate strength not found');
  });
});
module.exports = strengthRoutes;
