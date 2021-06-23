const userRoutes = require('express').Router();
const { hashPassword } = require('../middlewares/auth');

const db = require('../db-config');

userRoutes.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).json(results);
    }
  });
});

userRoutes.get('/:id', (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500);
    } else if (results.length !== 1) {
      res.status(404);
    } else {
      delete results[0].password;
      res.status(200).json(results[0]);
    }
  });
});

/* Etape 1, définir une route qui va accueillir le post email et password */
userRoutes.post('/', hashPassword, (req, res) => {
  const user = {
    email: req.body.email,
    role_id: req.body.role_id,
    password: req.body.password,
    name: req.body.name,
    username: req.body.username,
    telephone: req.body.telephone,
  };

  db.query('INSERT INTO users ( email, role_id, password, name, username, telephone) VALUES (?, ?, ?, ?, ?, ?)', [user.email, user.role_id, user.password, user.name, user.username, user.telephone], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      delete user.password;
      res.status(201).json({ ...user, id: results.insertId });
    }
  });
});

userRoutes.put('/:id', (req, res) => {
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
            res.status(500).send('Error updating user');
          } else {
            res.status(200).json(userToUpdate);
          }
        });
      }
    }
  });
});

userRoutes.delete('/:id', (req, res) => (
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a user');
    } else if (results.affectedRows) res.status(200).send(' 🎉 User deleted');
    else res.status(404).send('User not found');
  })
));

module.exports = userRoutes;
