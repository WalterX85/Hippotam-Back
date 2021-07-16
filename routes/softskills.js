const softskillRoutes = require('express').Router();

const db = require('../db-config');
const { verifyToken } = require('../middlewares/auth');

// user's soft skills routes
softskillRoutes.get('/:user_id/softskills', (req, res) => {
  const userId = req.params.user_id;
  db.query('SELECT number, softskills FROM softskill WHERE user_id=?',
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

softskillRoutes.post('/:user_id/softskills', verifyToken, (req, res) => {
  const userId = req.params.user_id;
  const usersoftskills = {
    number: req.body.number,
    softskills: req.body.softskills,
  };
  db.query('SELECT softskills FROM softskill WHERE user_id = ? AND number = ?',
    [userId, usersoftskills.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error saving user softskills');
      } else {
        const softskillsFromDB = selectResults[0];
        if (softskillsFromDB) {
          const softskillsToUpdate = req.body;
          db.query('UPDATE softskill SET softskills = ? WHERE user_id = ? AND number = ?', [usersoftskills.softskills, userId, usersoftskills.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the user softskills');
            } else {
              const updated = { ...softskillsFromDB, ...softskillsToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query('INSERT INTO softskill(number, softskills, user_id) VALUES (?, ?, ?)',
            [usersoftskills.number,
              usersoftskills.softskills,
              userId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error saving user softskills');
              } else {
                const updatedusersoftskills = {
                  id: insertResults.insertId,
                  userId,
                  number: usersoftskills.number,
                  softskills: usersoftskills.softskills,
                };
                res.status(201).send(updatedusersoftskills);
              }
            });
        }
      }
    });
});

softskillRoutes.delete('/:user_id/softskills/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM softskill WHERE user_id = ? AND number = ?', [req.params.user_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a user soft skills');
    } else if (results.affectedRows) res.status(200).send(' 🎉user soft skills deleted');
    else res.status(404).send('user soft skills not found');
  });
});

module.exports = softskillRoutes;
