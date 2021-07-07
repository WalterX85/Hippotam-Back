const screenRoutes = require('express').Router();

const db = require('../db-config');

const { verifyToken } = require('../middlewares/auth');

screenRoutes.get('/', (req, res) => {
  db.query('SELECT * FROM candidates', (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(200).json(results);
    }
  });
});

screenRoutes.get('/:id', (req, res) => {
  db.query('SELECT * FROM candidates WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).json(results);
    }
  });
});

screenRoutes.post('/', verifyToken, (req, res) => {
  const candidate = {
    name: req.body.name,
    username: req.body.username,
    telephone: req.body.telephone,
  };

  const userId = req.payload.sub;
  db.query('INSERT into candidates( user_id, name, username, telephone) VALUES(?, ?, ?, ?)', [userId, candidate.name, candidate.username, candidate.telephone], (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(201).json({
        ...candidate, id: results.insertId,
      });
    }
  });
});

screenRoutes.put('/:id', (req, res) => {
  const candidateId = req.params.id;
  db.query('SELECT * FROM candidates WHERE id = ?', [candidateId], (selectErr, results) => {
    if (selectErr) {
      res.status(500).send('Error updating the candidates');
    } else {
      const candidate = results[0];
      if (candidate) {
        const candidateToUpdate = { ...candidate, ...req.body };
        db.query('UPDATE candidates SET ? WHERE id = ?', [candidateToUpdate, candidateId], (updateErr) => {
          if (updateErr) {
            console.log(updateErr);
            res.sendStatus(500);
          } else {
            res.status(200).json(candidateToUpdate);
          }
        });
      }
    }
  });
});

screenRoutes.delete('/:id', (req, res) => (
  db.query('DELETE FROM candidates WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else if (results.affectedRows) res.status(200).send(' 🎉 candidate deleted');
    else res.status(404).send('candidate not found');
  })
));

module.exports = screenRoutes;
