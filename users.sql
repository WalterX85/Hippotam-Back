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
  `softskills` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT= 4 DEFAULT CHARSET = utf8;


INSERT INTO 
 `softskills`
VALUES
  (1, 'adaptabilité'),
  (2, 'aisance relationnelle'),
  (3, 'apprendre à apprendre'),
  (4, 'audace'),
  (5, 'autonomie'),
  (6, 'capacité à déléguer'),
  (7, 'communication'),
  (8, 'concentration'),
  (9, 'confiance en soi'),
  (10, 'capacité à motiver'),
  (11, 'esprit déquipe'),
  (12, 'gestion des conflits'),
  (13, 'empathique'),
  (14, 'leadership'),
  (15, 'créatif'),
  (16, 'curiosité');

  DROP TABLE IF EXISTS  `valeurs`;

CREATE TABLE `valeurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `valeurs` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT= 4 DEFAULT CHARSET = utf8;


INSERT INTO 
 `valeurs`
VALUES
  (1, 'respect'),
  (2, 'acceptation'),
  (3, 'considération'),
  (4, 'discrétion'),
  (5, 'accueil'),
  (6, 'ouverture'),
  (7, 'entraide'),
  (8, 'réciprocité'),
  (9, 'solidarité'),
  (10, 'écoute'),
  (11, 'bienveillance'),
  (12, 'fraternité'),
  (13, 'altruisme'),
  (14, 'discernement'),
  (15, 'courage'),
  (16, 'dignité');


