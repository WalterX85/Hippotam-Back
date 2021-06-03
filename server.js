const express = require("express");
const connection = require('./db-config');
const app = express();

const port = process.env.PORT || 3000;

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log('connected to database with threadId : ' + connection.threadId);
  }
});

app.get("/", (request, response) => {
  console.log(request);
  response.send("Welcome to Express");
});

app.post("/users/:id/softskills", (request, response) => {
  console.log(request);
  response.send("Welcome to softskills");
});
app.get("/users/:id/softskills", (request, response) => {
  console.log(request);
  response.send("Welcome to softskills");
});

app.get("/users/:name", (request, response) => {
  response.send(`welcome user ${request.params.name}`);
});
app.listen(port, () => {
  console.log(`Server is runing on ${port}`);
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database');
    } else {
      res.status(200).json(result);
    }
  });
});

app.get('/softskills', (req, res) => {
  connection.query('SELECT * FROM softskill', (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database');
    } else {
      res.status(200).json(result);
    }
  });
});

