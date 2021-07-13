const languesRoutes = require('express').Router();

const db = require('../db-config');

const { verifyToken } = require('../middlewares/auth');

// user's langue routes
languesRoutes.get('/:user_id/langues', (req, res) => {
  const userId = req.params.user_id;
  db.query('SELECT name, username, number, langueName FROM users JOIN langue ON users.id=langue.user_id ORDER BY name, username, number, langueName',
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

languesRoutes.post('/:user_id/langues', verifyToken, (req, res) => {
  const userId = req.params.user_id;
  const userLangues = {
    number: req.body.number,
    langueName: req.body.langueName,
  };
  db.query('SELECT langueName FROM langue WHERE user_id = ? AND number = ?',
    [userId, userLangues.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error selecting the user language');
      } else {
        const langueFromDB = selectResults[0];
        if (langueFromDB) {
          const langueToUpdate = req.body;
          db.query('UPDATE langue SET langueName = ? WHERE user_id = ? AND number = ?', [userLangues.langueName, userId, userLangues.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the user language');
            } else {
              const updated = { ...langueFromDB, ...langueToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query('INSERT INTO langue(number, langueName, user_id) VALUES (?, ?, ?)',
            [userLangues.number,
              userLangues.langueName,
              userId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error saving user langue');
              } else {
                const updateduserLangue = {
                  id: insertResults.insertId,
                  userId,
                  number: userLangues.number,
                  langueName: userLangues.langueName,
                };
                res.status(201).send(updateduserLangue);
              }
            });
        }
      }
    });
});

languesRoutes.delete('/:user_id/langues/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM langue WHERE user_id = ? AND number = ?', [req.params.user_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a user language');
    } else if (results.affectedRows) res.status(200).send(' 🎉user language deleted');
    else res.status(404).send('user language not found');
  });
});

module.exports = languesRoutes;
