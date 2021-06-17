const userRoutes = require('express').Router();
const { hashPassword } = require('../middlewares/auth');

const db = require('../db-config');

userRoutes.get('/', (req, res) => {
  db.query('SELECT * fROM users', (err, results) => {
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
    password: req.body.password,
  };

  db.query('INSERT INTO users ( email , password ) VALUES (?, ?)', [user.email, user.password], (err, results) => {
    if (err) {
      res.status(500);
    } else {
      delete user.password;
      res.status(201).json({ ...user, id: results.insertId });
    }
  });
});

module.exports = userRoutes;
