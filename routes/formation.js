const formationRoutes = require('express').Router();

// user's formation routes

const db = require('../db-config');
const { verifyToken } = require('../middlewares/auth');

formationRoutes.get('/:user_id/formation', (req, res) => {
  const userId = req.params.user_id;
  db.query('SELECT name, username, number, formation, FROM users JOIN formation ON users.id=formation.user_id ORDER BY name, username, number, formation',
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

formationRoutes.post('/:user_id/formation', verifyToken, (req, res) => {
  const userId = req.params.user_id;
  const userFormation = {
    number: req.body.number,
    formation: req.body.formation,
  };
  db.query('SELECT formation FROM formation WHERE user_id = ? AND number = ?',
    [userId, userFormation.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error saving user formation');
      } else {
        const formationFromDB = selectResults[0];
        if (formationFromDB) {
          const formationToUpdate = req.body;
          db.query('UPDATE formation SET formation = ? WHERE user_id = ? AND number = ?', [userFormation, userId, userFormation.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the user whatelse');
            } else {
              const updated = { ...formationFromDB, ...formationToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query('INSERT INTO formation(number, formation, user_id) VALUES (?, ?, ?)',
            [userFormation.number,
              userFormation.formation,
              userId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error saving user formation');
              } else {
                const updatedUserFormation = {
                  id: insertResults.insertId,
                  userId,
                  formation: userFormation.formation,
                };
                res.status(201).send(updatedUserFormation);
              }
            });
        }
      }
    });
});

formationRoutes.delete('/:user_id/formation/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM formation WHERE user_id = ? AND number = ?', [req.params.user_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a user formation');
    } else if (results.affectedRows) res.status(200).send(' 🎉user formation deleted');
    else res.status(404).send('user formation not found');
  });
});

module.exports = formationRoutes;
