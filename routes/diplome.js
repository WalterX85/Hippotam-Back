const diplomeRoutes = require('express').Router();

// user's diplome routes

const db = require('../db-config');
const { verifyToken } = require('../middlewares/auth');

diplomeRoutes.get('/:user_id/diplome', (req, res) => {
  const userId = req.params.user_id;
  db.query('SELECT name, username, number, diplome FROM users JOIN diplome ON users.id=diplome.user_id ORDER BY name, username, number, diplome',
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

diplomeRoutes.post('/:user_id/diplome', verifyToken, (req, res) => {
  const userId = req.params.user_id;
  const userDiplome = {
    number: req.body.number,
    diplome: req.body.diplome,
  };
  db.query('SELECT diplome FROM diplome WHERE user_id = ? AND number = ?',
    [userId, userDiplome.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error saving user diplome');
      } else {
        const diplomeFromDB = selectResults[0];
        if (diplomeFromDB) {
          const diplomeToUpdate = req.body;
          db.query('UPDATE diplome SET diplome = ? WHERE user_id = ? AND number = ?', [userDiplome, userId, userDiplome.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the user diplome');
            } else {
              const updated = { ...diplomeFromDB, ...diplomeToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query('INSERT INTO diplome(number, diplome, user_id) VALUES (?, ?, ?)',
            [userDiplome.number,
              userDiplome.diplome,
              userId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error saving user diplome');
              } else {
                const updatedUserDiplome = {
                  id: insertResults.insertId,
                  userId,
                  diplome: userDiplome.formation,
                };
                res.status(201).send(updatedUserDiplome);
              }
            });
        }
      }
    });
});

diplomeRoutes.delete('/:user_id/diplome/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM diplome WHERE user_id = ? AND number = ?', [req.params.user_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a user diplome');
    } else if (results.affectedRows) res.status(200).send(' 🎉user what else deleted');
    else res.status(404).send('user diplome not found');
  });
});

module.exports = diplomeRoutes;
