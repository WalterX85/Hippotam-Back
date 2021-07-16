const myValuesRoutes = require('express').Router();

const db = require('../db-config');

const { verifyToken } = require('../middlewares/auth');

// user's value routes
myValuesRoutes.get('/:user_id/values', (req, res) => {
  const userId = req.params.user_id;
  db.query('SELECT number, valueName FROM value WHERE user_id=?',
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

myValuesRoutes.post('/:user_id/values', verifyToken, (req, res) => {
  const userId = req.params.user_id;
  const userValue = {
    number: req.body.number,
    valueName: req.body.valueName,
  };
  db.query('SELECT valueName FROM value WHERE user_id = ? AND number = ?',
    [userId, userValue.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error saving user value');
      } else {
        const valueFromDB = selectResults[0];
        if (valueFromDB) {
          const valueToUpdate = req.body;
          db.query('UPDATE value SET valueName = ? WHERE user_id = ? AND number = ?', [userValue.valueName, userId, userValue.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the user value');
            } else {
              const updated = { ...valueFromDB, ...valueToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query('INSERT INTO value(number, valueName, user_id) VALUES (?, ?, ?)',
            [userValue.number,
              userValue.valueName,
              userId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Errors saving user value');
              } else {
                const updateduserValue = {
                  id: insertResults.insertId,
                  userId,
                  number: userValue.number,
                  valueName: userValue.valueName,
                };
                res.status(201).send(updateduserValue);
              }
            });
        }
      }
    });
});

myValuesRoutes.delete('/:user_id/values/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM value WHERE user_id = ? AND number = ?', [req.params.user_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a user value');
    } else if (results.affectedRows) res.status(200).send(' 🎉user value deleted');
    else res.status(404).send('user value not found');
  });
});

module.exports = myValuesRoutes;
