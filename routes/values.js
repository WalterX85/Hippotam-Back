const myValuesRoutes = require('express').Router();

const db = require('../db-config');

const { verifyToken } = require('../middlewares/auth');

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

myValuesRoutes.post('/:candidate_id/values', verifyToken, (req, res) => {
  const candidateId = req.params.candidate_id;
  const candidateValue = {
    number: req.body.number,
    valueName: req.body.valueName,
  };
  db.query('SELECT valueName FROM candidate_value WHERE candidate_id = ? AND number = ?',
    [candidateId, candidateValue.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error saving Candidate value');
      } else {
        const valueFromDB = selectResults[0];
        if (valueFromDB) {
          const valueToUpdate = req.body;
          db.query('UPDATE candidate_value SET valueName = ? WHERE candidate_id = ? AND number = ?', [candidateValue.valueName, candidateId, candidateValue.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the candidate value');
            } else {
              const updated = { ...valueFromDB, ...valueToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query('INSERT INTO candidate_value(number, valueName, candidate_id) VALUES (?, ?, ?)',
            [candidateValue.number,
              candidateValue.valueName,
              candidateId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Errors saving Candidate value');
              } else {
                const updatedCandidateValue = {
                  id: insertResults.insertId,
                  candidateId,
                  number: candidateValue.number,
                  valueName: candidateValue.valueName,
                };
                res.status(201).send(updatedCandidateValue);
              }
            });
        }
      }
    });
});

myValuesRoutes.delete('/:candidate_id/values/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM candidate_value WHERE candidate_id = ? AND number = ?', [req.params.candidate_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a candidate value');
    } else if (results.affectedRows) res.status(200).send(' 🎉candidate value deleted');
    else res.status(404).send('candidate value not found');
  });
});

module.exports = myValuesRoutes;
