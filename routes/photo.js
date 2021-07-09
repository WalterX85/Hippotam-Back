const photoRoutes = require('express').Router();
const multer = require('multer');

const upload = multer({ dest: `${__dirname}/public/photos/` });

const fs = require('fs');
const db = require('../db-config');

const { verifyToken } = require('../middlewares/auth');

photoRoutes.get('/:candidate_id/photos', (req, res) => {
  const candidateId = req.params.candidate_id;
  db.query('SELECT name, username, number, photo FROM candidates JOIN photos ON candidates.id=photos.candidate_id ORDER BY name, username, number, name, photo',
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

photoRoutes.post('/:candidate_id/photos', verifyToken, upload.single('blob'), (req, res) => {
  fs.renameSync(req.file.path,
    `public/photos/${req.file.filename}.wav`);
  const candidateId = req.params.candidate_id;
  const candidatePhoto = {
    number: req.body.number,
    photo: req.file.filename,
  };
  db.query('SELECT photo FROM photos WHERE candidate_id = ? AND number = ?',
    [candidateId, candidatePhoto.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error selecting the candidate photo');
      } else {
        const photoFromDB = selectResults[0];
        if (photoFromDB) {
          const photoToUpdate = req.body;
          db.query('UPDATE photos SET candidatePhoto = ? WHERE candidate_id = ? AND number = ?', [candidatePhoto, candidateId, candidatePhoto.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the Candidate photo');
            } else {
              const updated = { ...photoFromDB, ...photoToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query(
            'INSERT INTO candidatePop (number, photo, candidateId) VALUES (?, ?, ?)',
            [candidatePhoto.number,
              candidatePhoto.photo,
              candidateId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.sendStatus(500).send('Error saving Candidate photo');
              } else {
                const updatedCandidatePhoto = {
                  id: insertResults.insertId,
                  candidateId,
                  photo: candidatePhoto.photo,
                };
                res.status(201).send(updatedCandidatePhoto);
              }
            },
          );
        }
      }
    });
});

photoRoutes.delete('/:candidate_id/photos/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM photos WHERE candidate_id = ? AND number = ?', [req.params.candidate_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a candidate photo');
    } else if (results.affectedRows) res.status(200).send(' 🎉candidate photo deleted');
    else res.status(404).send('candidate photo not found');
  });
});

module.exports = photoRoutes;
