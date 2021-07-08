const hardSkillsRoutes = require('express').Router();

const db = require('../db-config');

// Candidate's hard skills routes
hardSkillsRoutes.get('/:candidate_id/hardSkills', (req, res) => {
  const candidateId = req.params.candidate_id;
  db.query(' SELECT candidates.name, candidates.username, number,hardSkillsName FROM candidates JOIN candidate_hardSkills ON candidates.id=candidate_hardSkills.candidate_id ORDER BY candidates.name, candidates.username, number, hardSkillsName',
    [candidateId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).json(results);
      }
    });
});

hardSkillsRoutes.get('/:candidate_id/candidate_hardSkills/number', (req, res) => {
  const candidateId = req.params.candidate_id;
  db.query('SELECT number, hardSkillsName FROM candidates JOIN candidate_hardSkills ON candidates.id=candidate_hardSkills.candidate_id ORDER BY number, hardSkillsName',
    [candidateId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).json(results);
      }
    });
});

hardSkillsRoutes.post('/:candidate_id/hardSkills', (req, res) => {
  const candidateHardSkills = {
    number: req.body.number,
    hardSkillsName: req.body.hardSkillsName,
  };
  const candidateId = req.params.candidate_id;
  db.query('INSERT INTO candidate_hardSkills(number, hardSkillsName, candidate_id) VALUES (?, ?, ?)',
    [candidateHardSkills.number, candidateHardSkills.hardSkillsName, candidateId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error saving Candidate hardskills');
      } else {
        const updatedCandidateHardSkills = {
          id: results.insertId,
          candidateId,
          number: candidateHardSkills.number,
          hardSkillsName: candidateHardSkills.hardskillsName,
        };
        res.status(201).send(updatedCandidateHardSkills);
      }
    });
});

hardSkillsRoutes.put('/:candidate_id/candidate_hardSkills/hardSkillsName', (req, res) => {
  const candidateId = req.params.candidate_id;
  const hardSkills = req.body.hardSkillsName;
  db.query('SELECT hardSkillsName FROM candidate_hardSkills WHERE number = ?',
    [candidateId, hardSkills],
    (selectErr, results) => {
      if (selectErr) {
        res.status(500).send('Error selecting the candidate hard skills');
      } else {
        const hardSkillsFromDB = results[0];
        if (hardSkillsFromDB) {
          const hardSkillsToUpdate = req.body;
          db.query('UPDATE candidate_hardSkills SET ? WHERE candidate_hardSkills.number = ?', [hardSkillsToUpdate, candidateId], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the candidate hard skills');
            } else {
              const updated = { ...hardSkillsFromDB, ...hardSkillsToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          res.status(404).send(`Hard Skill with name ${hardSkills} not found.`);
        }
      }
    });
});

hardSkillsRoutes.delete('/:candidate_id/candidate_hardSkills/:id', (req, res) => {
  db.query('DELETE FROM candidate_hardSkills WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a candidate hard skills');
    } else if (results.affectedRows) res.status(200).send(' 🎉candidate hard skills deleted');
    else res.status(404).send('candidate hard skills not found');
  });
});

module.exports = hardSkillsRoutes;
