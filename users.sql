CREATE DATABASE personality;
USE personality;
DROP TABLE IF EXISTS  `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(95) NOT NULL,
  `phone` varchar(100) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT= 3 DEFAULT CHARSET = utf8;


INSERT INTO
 `users`
VALUES
  (1, 'Toto', 'duf', 't@gmail.com', '123456', '0690235421');
 

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

  create table user(
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100),
  password VARCHAR(95)
);

