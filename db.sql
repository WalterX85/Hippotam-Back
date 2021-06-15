DROP DATABASE IF EXISTS personality;
CREATE DATABASE personality;

USE personality;
DROP TABLE IF EXISTS  `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(95) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8;


INSERT INTO
 `users`
VALUES
  ('1', 't@gmail.com', '123456');

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `photo` BLOB,
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS `candidates`;

CREATE TABLE `candidates` (
 `id` int NOT NULL AUTO_INCREMENT,
 `user_id` int NOT NULL,
 `photo_id` int NOT NULL,
 `name` varchar(100) NOT NULL,
 `username` varchar(100) NOT NULL,
 `phone` varchar(100) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_UserCandidate FOREIGN KEY (user_id)
    REFERENCES users(id),
  CONSTRAINT FK_PhotoCandidate FOREIGN KEY(photo_id) 
  REFERENCES photos(id) 
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS  `softskills`;

CREATE TABLE `softskills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `softskills` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8;

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

DROP TABLE IF EXISTS  `candidate_softskill`;

CREATE TABLE candidate_softskill (
  `id` int NOT NULL AUTO_INCREMENT,
   `softskill_id` int NOT NULL,
   `candidate_id` int NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_CandidateSoftSkill FOREIGN KEY (candidate_id)
    REFERENCES candidates(id),
 CONSTRAINT FK_SoftskillCandidate FOREIGN KEY (softskill_id)
    REFERENCES softskills(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS  `my_values`;

CREATE TABLE `my_values` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8;

INSERT INTO 
 `my_values`
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


CREATE TABLE candidate_value (
   `id` int NOT NULL AUTO_INCREMENT,
   `value_id` int NOT NULL,
   `candidate_id` int NOT NULL,
  PRIMARY KEY(`id`),
 CONSTRAINT FK_ValueCandidate FOREIGN KEY (value_id)
    REFERENCES my_values(id),
  CONSTRAINT FK_CandidateValue FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8