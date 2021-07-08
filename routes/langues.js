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
  const candidateId = req.params.candidate_id;
  const candidateLangues = {
    number: req.body.number,
    langueName: req.body.langueName,
  };
  db.query('SELECT langueName FROM candidate_langues WHERE candidate_id = ? AND number = ?',
    [candidateId, candidateLangues.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error selecting the candidate language');
      } else {
        const langueFromDB = selectResults[0];
        if (langueFromDB) {
          const langueToUpdate = req.body;
          db.query('UPDATE candidate_langues SET langueName = ? WHERE candidate_id = ? AND number = ?', [candidateLangues.langueName, candidateId, candidateLangues.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the candidate language');
            } else {
              const updated = { ...langueFromDB, ...langueToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query('INSERT INTO candidate_langues(number, langueName, candidate_id) VALUES (?, ?, ?)',
            [candidateLangues.number,
              candidateLangues.langueName,
              candidateId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error saving Candidate langue');
              } else {
                const updatedCandidateLangue = {
                  id: insertResults.insertId,
                  candidateId,
                  number: candidateLangues.number,
                  langueName: candidateLangues.langueName,
                };
                res.status(201).send(updatedCandidateLangue);
              }
            });
        }
      }
    });
});

languesRoutes.delete('/:candidate_id/langues/:number', (req, res) => {
  db.query('DELETE FROM candidate_langues WHERE candidate_id = ? AND number = ?', [req.params.candidate_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a candidate language');
    } else if (results.affectedRows) res.status(200).send(' 🎉candidate language deleted');
    else res.status(404).send('candidate language not found');
  });
});

module.exports = languesRoutes;
