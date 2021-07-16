const photoRoutes = require('express').Router();
const multer = require('multer');

const upload = multer({ dest: `${__dirname}/public/photos/` });

const fs = require('fs');
const db = require('../db-config');

const { verifyToken } = require('../middlewares/auth');

photoRoutes.get('/:user_id/photos', (req, res) => {
  const userId = req.params.user_id;
  db.query('SELECT number, photo FROM photos WHERE user_id=?',
    [userId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).json(results);
      }
    });
});

photoRoutes.post('/:user_id/photos', verifyToken, upload.single('blob'), (req, res) => {
  fs.renameSync(req.file.path,
    `${__dirname}/public/photos/${req.file.filename}`);
  const userId = req.params.user_id;
  const userPhoto = {
    number: req.body.number,
    photo: req.file.filename,
  };
  db.query('SELECT photo FROM photos WHERE user_id = ? AND number = ?',
    [userId, userPhoto.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error selecting the user photo');
      } else {
        const photoFromDB = selectResults[0];
        if (photoFromDB) {
          db.query('UPDATE photos SET photo = ? WHERE user_id = ? AND number = ?', [userPhoto.photo, userId, userPhoto.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the user photo');
            } else {
              const updated = { ...photoFromDB, photo: userPhoto.photo };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query(
            'INSERT INTO photos(number, photo, user_id) VALUES (?, ?, ?)',
            [userPhoto.number,
              userPhoto.photo,
              userId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.sendStatus(500).send('Error saving user photo');
              } else {
                const updateduserPhoto = {
                  id: insertResults.insertId,
                  userId,
                  photo: userPhoto.photo,
                };
                res.status(201).send(updateduserPhoto);
              }
            },
          );
        }
      }
    });
});

photoRoutes.delete('/:user_id/photos/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM photos WHERE user_id = ? AND number = ?', [req.params.user_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a user photo');
    } else if (results.affectedRows) res.status(200).send(' 🎉user photo deleted');
    else res.status(404).send('user photo not found');
  });
});

module.exports = photoRoutes;
