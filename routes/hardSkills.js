const hardSkillsRoutes = require('express').Router();

const db = require('../db-config');

hardSkillsRoutes.get('/', (req, res) => {
  db.query('SELECT * FROM hardSkills', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200).json(results);
    }
  });
});

hardSkillsRoutes.get('/:id', (req, res) => {
  db.query('SELECT * FROM hardSkills WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200).json(results[0]);
    }
  });
});

hardSkillsRoutes.post('/', (req, res) => {
  const hardSkills = {
    hardSkillsName: req.body.hardSkillsName,
  };

  db.query('INSERT INTO hardSkills (hardSkillsName) VALUES (?)', [hardSkills.hardSkillsName], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(201).json({ ...hardSkills, id: results.insertId });
    }
  });
});
module.exports = hardSkillsRoutes;
