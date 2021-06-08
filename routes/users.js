const argon2 = require('argon2');
const connection = require("../db-config");

const userRoutes = require('express').Router();

userRoutes.get('/', (req, res) => {
  connection.query('SELECT * from users', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    }
    else {
      res.status(200).json(results);
    }
  })
});
/* Etape 1, définir une route qui va accueillir le post email et password */
userRoutes.post('/', async (req, res) => {
  const user = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  };
  user.password = await argon2.hash(user.password);

  connection.query('INSERT INTO users ( name , username , email , password , phone ) VALUES (?, ?, ?, ?, ?)', [user.name, user.username, user.email, user.password, user.phone], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    }
    else {
      delete user.password;
      res.status(201).json({...user, id: results.insertId});
    }
  })
});

module.exports = userRoutes;