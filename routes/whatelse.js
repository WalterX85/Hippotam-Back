const whatElseRoutes = require('express').Router();

// user's what else routes

const db = require('../db-config');
const { verifyToken } = require('../middlewares/auth');

whatElseRoutes.get('/:user_id/whatelse', (req, res) => {
  const userId = req.params.user_id;
  db.query('SELECT name, username, number, diplome, formation, lastJob FROM users JOIN whatElse ON users.id=whatElse.user_id ORDER BY name, username, number, name, diplome, formation, lastJob',
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

whatElseRoutes.post('/:user_id/whatelse', verifyToken, (req, res) => {
  const userId = req.params.user_id;
  const userWhatElse = {
    number: req.body.number,
    diplome: req.body.diplome,
    formation: req.body.formation,
    lastJob: req.body.lastJob,
  };
  db.query('SELECT * FROM whatElse WHERE user_id = ? AND number = ?',
    [userId, userWhatElse.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error saving user what else');
      } else {
        const whatElseFromDB = selectResults[0];
        if (whatElseFromDB) {
          const whatElseToUpdate = req.body;
          db.query('UPDATE whatElse SET userWhatElse = ? WHERE user_id = ? AND number = ?', [userWhatElse, userId, userWhatElse.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the user whatelse');
            } else {
              const updated = { ...whatElseFromDB, ...whatElseToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query('INSERT INTO whatElse(number, diplome, formation, lastJob, user_id) VALUES (?, ?, ?, ?, ?)',
            [userWhatElse.number,
              userWhatElse.diplome,
              userWhatElse.formation,
              userWhatElse.lastJob,
              userId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error saving user value');
              } else {
                const updatedUserWhatElse = {
                  id: insertResults.insertId,
                  userId,
                  diplome: userWhatElse.diplome,
                  formation: userWhatElse.formation,
                  lastJob: userWhatElse.lastJob,
                };
                res.status(201).send(updatedUserWhatElse);
              }
            });
        }
      }
    });
});

whatElseRoutes.delete('/:user_id/whatelse/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM whatElse WHERE user_id = ? AND number = ?', [req.params.user_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a user what else');
    } else if (results.affectedRows) res.status(200).send(' 🎉user what else deleted');
    else res.status(404).send('user what else not found');
  });
});

module.exports = whatElseRoutes;
