require('dotenv').config();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const hashPassword = async (req, res, next) => {
  req.body.password = await argon2.hash(req.body.password);
  next();
};

const verifyPassword = async (req, res, next) => {
  if (await argon2.verify(req.db.password, req.body.password)) {
    const token = jwt.sign({ sub: req.db.id }, process.env.TOKEN_SECRET);
    res.status(200).json({ token, email: req.body.email, userId: req.db.id });
  } else {
    res.sendStatus(400);
  }
  next();
};

const verifyToken = (req, res, next) => {
  const verify = req.headers.authorization;
  const token = verify && verify.split(' ')[1];
  if (token == null) res.sendStatus(401);

  else {
    req.payload = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
};
