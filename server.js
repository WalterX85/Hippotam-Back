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

app.post("/users/:id/softskill", (request, response) => {
  console.log(request);
  response.send("Welcome to softskill");
});
app.get("/users/:id/softskill", (request, response) => {
  console.log(request);
  response.send("Welcome to softskill");
});

app.get("/users/:name", (request, response) => {
  response.send(`welcome user ${request.params.name}`);
});
app.listen(port, () => {
  console.log(`Server is runing on ${port}`);
});

/* Nous créons des routes pour acceder a une élément du tab ou un not found */

const fruits = ["Apple", "Banana", "Kiwi"];

app.get("/fruits", (request, response) => {
  if(fruits.includes(request.query.name)) {
    response.send(`Here is your ${request.query.name}`);
  } else {
    response.send(`Sorry, ${request.query.name  } not found...`);
  }
});

/* Ici ns renvoyons le tableau en json avec le localhost:3000/cocktails */

const cocktails = [
  {
    id: 0,
    name: "Margarita",
  },
  {
    id: 1,
    name: "Mojito",
  },
  {
    id: 2,
    name: "Cuba Libre",
  },
];

/* Avec Params, cette requete affiche welcome user cedric en tapant localhost:3000/users/Cedric */

app.get("/utilisateur", (request, response) => {
  response.send(`Welcome ${request.params.id}`);
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

app.get('/softskill', (req, res) => {
  connection.query('SELECT * FROM softskill', (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database');
    } else {
      res.status(200).json(result);
    }
  });
});

