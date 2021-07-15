const recommendationsRoutes = require('express').Router();
const multer = require('multer');

const upload = multer({ dest: `${__dirname}/public/uploads/` });

const fs = require('fs');
const db = require('../db-config');

const { verifyToken } = require('../middlewares/auth');
// Candidate's recommendation routes

recommendationsRoutes.get('/:user_id/recommendations', (req, res) => {
  const userId = req.params.user_id;
  db.query('SELECT name, username, number, location, title FROM users JOIN recommendation ON users.id=recommendation.user_id ORDER BY name, username, number, location, title',
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

recommendationsRoutes.post('/:user_id/recommendations', verifyToken, upload.single('blob'), (req, res) => {
  fs.renameSync(req.file.path,
    `public/uploads/${req.file.filename}.wav`);
  const userId = req.params.user_id;
  const userRecommendation = {
    number: req.body.number,
    location: req.file.path,
    title: req.file.filename,
  };
  db.query('SELECT location, title FROM recommendation WHERE user_id = ? AND number = ?',
    [userId, userRecommendation.number],
    (selectErr, selectResults) => {
      if (selectErr) {
        res.status(500).send('Error selecting the user recommendation');
      } else {
        const recommendationFromDB = selectResults[0];
        if (recommendationFromDB) {
          const recommendationToUpdate = req.body;
          db.query('UPDATE pop SET recommendation = ? WHERE user_id = ? AND number = ?', [userRecommendation, userId, userRecommendation.number], (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating the user project');
            } else {
              const updated = { ...recommendationFromDB, ...recommendationToUpdate };
              res.status(200).send(updated);
            }
          });
        } else {
          db.query(
            'INSERT INTO recommendation(number, location, title, userId) VALUES (?, ?, ?, ?)',
            [userRecommendation.number,
              userRecommendation.location,
              userRecommendation.title,
              userId],
            (err, insertResults) => {
              if (err) {
                console.log(err);
                res.sendStatus(500).send('Error saving user recommendation');
              } else {
                const updatedUserRecommendation = {
                  id: insertResults.insertId,
                  userId,
                  location: userRecommendation.location,
                  title: userRecommendation.title,
                };
                res.status(201).send(updatedUserRecommendation);
              }
            },
          );
        }
      }
    });
});

recommendationsRoutes.delete('/:user_id/recommendations/:number', verifyToken, (req, res) => {
  db.query('DELETE FROM recommendation WHERE user_id = ? AND number = ?', [req.params.user_id, req.params.number], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting a user recommendation');
    } else if (results.affectedRows) res.status(200).send(' 🎉user recommendation deleted');
    else res.status(404).send('user recommendation not found');
  });
});

module.exports = recommendationsRoutes;
