const popRoutes = require('express').Router();
const multer = require('multer');

const upload = multer({ dest: `${__dirname}/public/uploads/` });

const fs = require('fs');
const db = require('../db-config');

const { verifyToken } = require('../middlewares/auth');

popRoutes.get('/:candidate_id/pop', (req, res) => {
  const candidateId = req.params.candidate_id;
  db.query('SELECT name, username, number, location, title FROM candidates JOIN candidate_pop ON candidates.id=candidate_pop.candidate_id ORDER BY name, username, number, location, title',
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

popRoutes.post('/:candidate_id/pop', verifyToken, upload.single('blob'), (req, res) => {
  fs.renameSync(req.file.path,
    `public/uploads/${req.file.filename}.wav`);
  const candidateId = req.params.candidate_id;
  const candidatePop = {
    number: req.body.number,
    location: req.file.path,
    title: req.file.filename,
  };
  db.query('SELECT location, title FROM candidate_pop WHERE candidate_id = ? AND number = ?',
    [candidateId, candidatePop.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error selecting the candidate project');
      } else {
        const popFromDB = selectResults[0];
        if (popFromDB) {
          const popToUpdate = req.body;
          db.query('UPDATE candidate_pop SET candidatePop = ? WHERE candidate_id = ? AND number = ?', [candidatePop, candidateId, candidatePop.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the Candidate project');
            } else {
              const updated = { ...popFromDB, ...popToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query(
            'INSERT INTO candidatePop (number, location, title, candidateId) VALUES (?, ?, ?, ?)',
            [candidatePop.number,
              candidatePop.location,
              candidatePop.title,
              candidateId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.sendStatus(500).send('Error saving Candidate project');
              } else {
                const updatedCandidatePop = {
                  id: insertResults.insertId,
                  candidateId,
                  location: candidatePop.location,
                  title: candidatePop.title,
                };
                res.status(201).send(updatedCandidatePop);
              }
            },
          );
        }
      }
    });
});

popRoutes.delete('/:candidate_id/pop/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM candidate_pop WHERE candidate_id = ? AND number = ?', [req.params.candidate_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a candidate project');
    } else if (results.affectedRows) res.status(200).send(' 🎉candidate project deleted');
    else res.status(404).send('candidate project not found');
  });
});
module.exports = popRoutes;
