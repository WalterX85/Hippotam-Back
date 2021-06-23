require('dotenv').config();

const express = require('express');

const server = express();

const cors = require('cors');

server.use(cors());
server.use(express.json());

const routes = require('./routes');

server.use(routes);

module.exports = server;
