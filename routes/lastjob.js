const lastjobRoutes = require('express').Router();

// user's last job routes

const db = require('../db-config');
const { verifyToken } = require('../middlewares/auth');

lastjobRoutes.get('/:user_id/lastjob', (req, res) => {
  const userId = req.params.user_id;
  db.query('SELECT name, username, number, lastJob FROM users JOIN lastjob ON users.id=lastjob.user_id ORDER BY name, username, number, lastJob',
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

lastjobRoutes.post('/:user_id/lastjob', verifyToken, (req, res) => {
  const userId = req.params.user_id;
  const userLastjob = {
    number: req.body.number,
    lastjob: req.body.lastjob,
  };
  db.query('SELECT lastjob FROM lastjob WHERE user_id = ? AND number = ?',
    [userId, userLastjob.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error saving user lastjob');
      } else {
        const lastjobFromDB = selectResults[0];
        if (lastjobFromDB) {
          const lastjobToUpdate = req.body;
          db.query('UPDATE lastjob SET lastjob = ? WHERE user_id = ? AND number = ?', [userLastjob, userId, userLastjob.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the user last job');
            } else {
              const updated = { ...lastjobFromDB, ...lastjobToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query('INSERT INTO lastjob(number, lastjob, user_id) VALUES (?, ?, ?)',
            [userLastjob.number,
              userLastjob.lastjob,
              userId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error saving user last job');
              } else {
                const updatedUserLastJob = {
                  id: insertResults.insertId,
                  userId,
                  lastjob: userLastjob.lastjob,
                };
                res.status(201).send(updatedUserLastJob);
              }
            });
        }
      }
    });
});

lastjobRoutes.delete('/:user_id/lastjob/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM lasjob WHERE user_id = ? AND number = ?', [req.params.user_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a user last job');
    } else if (results.affectedRows) res.status(200).send(' 🎉user what else deleted');
    else res.status(404).send('user last job not found');
  });
});

module.exports = lastjobRoutes;
