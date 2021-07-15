const ambitionRoutes = require('express').Router();

const db = require('../db-config');

const { verifyToken } = require('../middlewares/auth');

// user's ambition routes
ambitionRoutes.get('/:user_id/ambition', (req, res) => {
  const userId = req.params.user_id;
  db.query('SELECT name, username, number, ambition FROM users JOIN ambition ON users.id=ambition.user_id ORDER BY name, username, number, ambition',
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

ambitionRoutes.post('/:user_id/ambition', verifyToken, (req, res) => {
  const userId = req.params.user_id;
  const userAmbition = {
    number: req.body.number,
    ambition: req.body.ambition,
  };
  db.query('SELECT ambition FROM ambition WHERE user_id = ? AND number = ?',
    [userId, userAmbition.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error selecting the user ambition');
      } else {
        const ambitionFromDB = selectResults[0];
        if (ambitionFromDB) {
          const ambitionToUpdate = req.body;
          db.query('UPDATE ambition SET userAmbition = ? WHERE user_id = ? AND number = ?', [userAmbition.ambition, userId, userAmbition.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the user ambition');
            } else {
              const updated = { ...ambitionFromDB, ...ambitionToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query('INSERT INTO ambition(number, ambition, user_id) VALUES (?, ?, ?)',
            [userAmbition.number,
              userAmbition.ambition,
              userId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error saving user ambition');
              } else {
                const updatedUserAmbition = {
                  id: insertResults.insertId,
                  userId,
                  number: userAmbition.number,
                  ambition: userAmbition.ambition,
                };
                res.status(201).send(updatedUserAmbition);
              }
            });
        }
      }
    });
});

ambitionRoutes.delete('/:user_id/ambition/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM ambition WHERE user_id = ? AND number = ?', [req.params.user_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a user ambition');
    } else if (results.affectedRows) res.status(200).send(' 🎉user ambition deleted');
    else res.status(404).send('user ambition not found');
  });
});

module.exports = ambitionRoutes;
