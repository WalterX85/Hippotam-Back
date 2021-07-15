const popRoutes = require('express').Router();
const multer = require('multer');

const upload = multer({ dest: `${__dirname}/public/uploads/` });

const fs = require('fs');
const db = require('../db-config');

const { verifyToken } = require('../middlewares/auth');

popRoutes.get('/:user_id/pop', (req, res) => {
  const userId = req.params.user_id;
  db.query('SELECT name, username, number, location, title FROM users JOIN pop ON users.id=pop.user_id ORDER BY name, username, number, location, title',
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

popRoutes.post('/:user_id/pop', verifyToken, upload.single('blob'), (req, res) => {
  fs.renameSync(req.file.path,
    `public/uploads/${req.file.filename}.wav`);
  const userId = req.params.user_id;
  const userPop = {
    number: req.body.number,
    location: req.file.path,
    title: req.file.filename,
  };
  db.query('SELECT location, title FROM pop WHERE user_id = ? AND number = ?',
    [userId, userPop.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error selecting the user project');
      } else {
        const popFromDB = selectResults[0];
        if (popFromDB) {
          const popToUpdate = req.body;
          db.query('UPDATE pop SET userPop = ? WHERE user_id = ? AND number = ?', [userPop, userId, userPop.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the user project');
            } else {
              const updated = { ...popFromDB, ...popToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query(
            'INSERT INTO pop(number, location, title, userId) VALUES (?, ?, ?, ?)',
            [userPop.number,
              userPop.location,
              userPop.title,
              userId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.sendStatus(500).send('Error saving user project');
              } else {
                const updatedUserPop = {
                  id: insertResults.insertId,
                  userId,
                  location: userPop.location,
                  title: userPop.title,
                };
                res.status(201).send(updatedUserPop);
              }
            },
          );
        }
      }
    });
});

popRoutes.delete('/:user_id/pop/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM pop WHERE user_id = ? AND number = ?', [req.params.user_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a user project');
    } else if (results.affectedRows) res.status(200).send(' 🎉user project deleted');
    else res.status(404).send('user project not found');
  });
});
module.exports = popRoutes;
