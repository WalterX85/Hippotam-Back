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
  db.query('SELECT * FROM users WHERE id = ?', (errId, resultsId) => {
    if (errId) {
      res.status(500);
    } else {
      res.status(200).json(resultsId);
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
