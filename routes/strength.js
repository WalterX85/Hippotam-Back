const strengthRoutes = require('express').Router();

const db = require('../db-config');
const { verifyToken } = require('../middlewares/auth');

// user's ambition routes
strengthRoutes.get('/:user_id/strength', (req, res) => {
  const userId = req.params.user_id;
  db.query('SELECT name, username, number, strength FROM users JOIN strength ON users.id=strength.user_id ORDER BY name, username, number, strength',
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

strengthRoutes.post('/:user_id/strength', verifyToken, (req, res) => {
  const userId = req.params.user_id;
  const userStrength = {
    number: req.body.number,
    strength: req.body.strength,
  };
  db.query('SELECT strength FROM strength WHERE user_id = ? AND number = ?',
    [userId, userStrength.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error selecting the user strength');
      } else {
        const strengthFromDB = selectResults[0];
        if (strengthFromDB) {
          const strengthToUpdate = req.body;
          db.query('UPDATE strength SET strength = ? WHERE user_id = ? AND number = ?', [userStrength.strength, userId, userStrength.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the user strength');
            } else {
              const updated = { ...strengthFromDB, ...strengthToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query('INSERT INTO strength(number, strength, user_id) VALUES (?, ?, ?)',
            [userStrength.number,
              userStrength.strength,
              userId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error saving user strength');
              } else {
                const updateduserStrength = {
                  id: insertResults.insertId,
                  userId,
                  number: userStrength.number,
                  strength: userStrength.strength,
                };
                res.status(201).send(updateduserStrength);
              }
            });
        }
      }
    });
});

strengthRoutes.delete('/:user_id/strength/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM strength WHERE user_id = ? AND number = ?', [req.params.user_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a user strength');
    } else if (results.affectedRows) res.status(200).send(' 🎉user strength deleted');
    else res.status(404).send('user strength not found');
  });
});
module.exports = strengthRoutes;
