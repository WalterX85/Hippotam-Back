CREATE DATABASE personality;
USE personality;
DROP TABLE IF EXISTS  `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT= 3 DEFAULT CHARSET = utf8;


INSERT INTO
 `users`
VALUES
  (1, 'Toto', 'iuggef'),
  (2, 'Calvinoo', 'tdydyfg'),
  (3, 'TomRich', 'uffdyf'),
  (4, 'Cyriloo', 'gfuugfud'),
  (5, 'DanyLaMalice', 'hdgfudg'),
  (6, 'Cedoo', 'yyfu');


DROP TABLE IF EXISTS  `softskills`;

CREATE TABLE `softskills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sk1` varchar(255) NOT NULL,
  `sk2` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT= 4 DEFAULT CHARSET = utf8;


INSERT INTO 
 `softskills`
VALUES
  (1, 'a', 'e'),
  (2, 'b', 'f'),
  (3, 'c', 'g'),
  (4, 'd', 'h');

