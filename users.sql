CREATE DATABASE users;
USE users;
DROP TABLE IF EXISTS users;

CREATE TABLE users;
(
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar
(255) NOT NULL,
  `password` varchar
(255) NOT NULL,

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES users WRITE;
INSERT INTO users
  (id, username, password)
VALUES
  (0, 'Cedoo', 'yyfu'),
  (1, 'Toto', 'iuggef'),
  (2, 'Calvinoo', 'tdydyfg'),
  (3, 'TomRich', 'uffdyf'),
  (4, 'Cyriloo', 'gfuugfud'),
  (5, 'DanyLaMalice', 'hdgfudg');
UNLOCK TABLES;
