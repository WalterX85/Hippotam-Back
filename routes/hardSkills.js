const hardSkillsRoutes = require('express').Router();

const db = require('../db-config');

const { verifyToken } = require('../middlewares/auth');

// user's hard skills routes
hardSkillsRoutes.get('/:user_id/hardSkills', (req, res) => {
  const userId = req.params.user_id;
  db.query(' SELECT number, hardSkillsName FROM hardSkills WHERE user_id=?',
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

hardSkillsRoutes.post('/:user_id/hardSkills', verifyToken, (req, res) => {
  const userId = req.params.user_id;
  const userHardSkills = {
    number: req.body.number,
    hardSkillsName: req.body.hardSkillsName,
  };
  db.query('SELECT hardSkillsName FROM hardSkills WHERE user_id = ? AND number = ?',
    [userId, userHardSkills.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error saving user hardskills');
      } else {
        const hardSkillsFromDB = selectResults[0];
        if (hardSkillsFromDB) {
          const hardSkillsToUpdate = req.body;
          db.query('UPDATE hardSkills SET hardSkillsName = ? WHERE user_id = ? AND number = ?', [userHardSkills.hardSkillsName, userId, userHardSkills.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the user hard skills');
            } else {
              const updated = { ...hardSkillsFromDB, ...hardSkillsToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query('INSERT INTO hardSkills(number, hardSkillsName, user_id) VALUES (?, ?, ?)',
            [userHardSkills.number,
              userHardSkills.hardSkillsName,
              userId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error saving user hard skills');
              } else {
                const updateduserHardSkills = {
                  id: insertResults.insertId,
                  userId,
                  number: userHardSkills.number,
                  hardSkillsName: userHardSkills.hardSkillsName,
                };
                res.status(201).send(updateduserHardSkills);
              }
            });
        }
      }
    });
});

hardSkillsRoutes.delete('/:user_id/hardSkills/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM hardSkills WHERE user_id = ? AND number = ?', [req.params.user_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a user hard skills');
    } else if (results.affectedRows) res.status(200).send(' 🎉user hard skills deleted');
    else res.status(404).send('user hard skills not found');
  });
});

module.exports = hardSkillsRoutes;
