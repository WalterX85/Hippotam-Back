const screenRoutes = require('express').Router();

const db = require('../db-config');

const { verifyToken } = require('../middlewares/auth');

screenRoutes.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(200).json(results);
    }
  });
});

screenRoutes.get('/:id', (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).json(results);
    }
  });
});

screenRoutes.post('/', verifyToken, (req, res) => {
  const user = {
    name: req.body.name,
    username: req.body.username,
    telephone: req.body.telephone,
  };

  const userId = req.payload.sub;
  db.query('INSERT into users( user_id, name, username, telephone) VALUES(?, ?, ?, ?)', [userId, user.name, user.username, user.telephone], (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(201).json({
        ...user, id: results.insertId,
      });
    }
  });
});

screenRoutes.put('/:id', verifyToken, (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [userId], (selectErr, results) => {
    if (selectErr) {
      res.status(500).send('Error updating the users');
    } else {
      const user = results[0];
      if (user) {
        const userToUpdate = { ...user, ...req.body };
        db.query('UPDATE users SET ? WHERE id = ?', [userToUpdate, userId], (updateErr) => {
          if (updateErr) {
            console.log(updateErr);
            res.sendStatus(500);
          } else {
            res.status(200).json(userToUpdate);
          }
        });
      }
    }
  });
});

screenRoutes.delete('/:id', verifyToken, (req, res) => (
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else if (results.affectedRows) res.status(200).send(' 🎉 user deleted');
    else res.status(404).send('user not found');
  })
));

module.exports = screenRoutes;
