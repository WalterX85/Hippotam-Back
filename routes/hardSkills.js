const hardSkillsRoutes = require('express').Router();

const db = require('../db-config');

const { verifyToken } = require('../middlewares/auth');

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

hardSkillsRoutes.post('/:candidate_id/hardSkills', verifyToken, (req, res) => {
  const candidateId = req.params.candidate_id;
  const candidateHardSkills = {
    number: req.body.number,
    hardSkillsName: req.body.hardSkillsName,
  };
  db.query('SELECT hardSkillsName FROM candidate_hardSkills WHERE candidate_id = ? AND number = ?',
    [candidateId, candidateHardSkills.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error saving Candidate hardskills');
      } else {
        const hardSkillsFromDB = selectResults[0];
        if (hardSkillsFromDB) {
          const hardSkillsToUpdate = req.body;
          db.query('UPDATE candidate_hardSkills SET hardSkillsName = ? WHERE candidate_id = ? AND number = ?', [candidateHardSkills.hardSkillsName, candidateId, candidateHardSkills.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the candidate hard skills');
            } else {
              const updated = { ...hardSkillsFromDB, ...hardSkillsToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query('INSERT INTO candidate_hardSkills(number, hardSkillsName, candidate_id) VALUES (?, ?, ?)',
            [candidateHardSkills.number,
              candidateHardSkills.hardSkillsName,
              candidateId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error saving Candidate hardskills');
              } else {
                const updatedCandidateHardSkills = {
                  id: insertResults.insertId,
                  candidateId,
                  number: candidateHardSkills.number,
                  langueName: candidateHardSkills.hardSkillsName,
                };
                res.status(201).send(updatedCandidateHardSkills);
              }
            });
        }
      }
    });
});

hardSkillsRoutes.delete('/:candidate_id/hardSkills/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM candidate_hardSkills WHERE candidate_id = ? AND number = ?', [req.params.candidate_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a candidate hard skills');
    } else if (results.affectedRows) res.status(200).send(' 🎉candidate hard skills deleted');
    else res.status(404).send('candidate hard skills not found');
  });
});

module.exports = hardSkillsRoutes;
