const softskillRoutes = require('express').Router();

const db = require('../db-config');
const { verifyToken } = require('../middlewares/auth');

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

softskillRoutes.post('/:candidate_id/softskills', verifyToken, (req, res) => {
  const candidateId = req.params.candidate_id;
  const candidateSoftskills = {
    number: req.body.number,
    softskills: req.body.softskills,
  };
  db.query('SELECT softskills FROM candidate_softskill WHERE candidate_id = ? AND number = ?',
    [candidateId, candidateSoftskills.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error saving Candidate softskills');
      } else {
        const softskillsFromDB = selectResults[0];
        if (softskillsFromDB) {
          const softskillsToUpdate = req.body;
          db.query('UPDATE candidate_softskill SET softskills = ? WHERE candidate_id = ? AND number = ?', [candidateSoftskills.softskills, candidateId, candidateSoftskills.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the candidate softskills');
            } else {
              const updated = { ...softskillsFromDB, ...softskillsToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query('INSERT INTO candidate_softskills(number, softskills, candidate_id) VALUES (?, ?, ?)',
            [candidateSoftskills.number,
              candidateSoftskills.softskills,
              candidateId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error saving Candidate softskills');
              } else {
                const updatedCandidateSoftskills = {
                  id: insertResults.insertId,
                  candidateId,
                  number: candidateSoftskills.number,
                  langueName: candidateSoftskills.softskills,
                };
                res.status(201).send(updatedCandidateSoftskills);
              }
            });
        }
      }
    });
});

softskillRoutes.delete('/:candidate_id/softskills/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM candidate_softskill WHERE candidate_id = ? AND number = ?', [req.params.candidate_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a candidate soft skills');
    } else if (results.affectedRows) res.status(200).send(' 🎉candidate soft skills deleted');
    else res.status(404).send('candidate soft skills not found');
  });
});

module.exports = softskillRoutes;
