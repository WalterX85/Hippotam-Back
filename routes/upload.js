const multer = require('multer');

const upload = multer({ dest: 'tmp/' });

const fs = require('fs');

const uploadRoutes = require('express').Router();

uploadRoutes.post('/', upload.single('File'), (req, res) => {
  console.log(req.file);
  if (req.file.size <= 990000000) {
    fs.renameSync(req.file.path, `uploads/${req.file.originalname}`);
  } else {
    fs.rmdirSync(req.file.path);
  }
  res.send('Hello dear API client :)');
});

module.exports = uploadRoutes;
