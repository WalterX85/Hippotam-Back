DROP DATABASE IF EXISTS personality;
CREATE DATABASE personality;

USE personality;

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,  
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

INSERT INTO 
 `role`
VALUES
  (1, 'candidate'),
  (2, 'admin'),
  (3, 'recruteur');

DROP TABLE IF EXISTS  `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,  
  `password` varchar(95) NOT NULL,
  `name` varchar(100) NOT NULL,
 `username` varchar(100) NOT NULL,
 `telephone` varchar(100) NOT NUll,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_UserRole FOREIGN KEY (role_id)
    REFERENCES role(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `candidates`;

CREATE TABLE `candidates` (
 `id` int NOT NULL AUTO_INCREMENT,
 `user_id` int NOT NULL,
 `name` varchar(100) NOT NULL,
 `username` varchar(100) NOT NULL,
 `telephone` varchar(100) NOT NUll,
  PRIMARY KEY(`id`),
   CONSTRAINT FK_UserCandidate FOREIGN KEY (user_id)
    REFERENCES users(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `recruteur`;

CREATE TABLE `recruteur` (
 `id` int NOT NULL AUTO_INCREMENT,
 `user_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
 `companyName` varchar(100) NOT NULL,
 `username` varchar(100) NOT NULL,
 `phone` varchar(100) NOT NULL,
  PRIMARY KEY(`id`),
   CONSTRAINT FK_RecruteurCandidate FOREIGN KEY (user_id)
    REFERENCES users(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `login`;

CREATE TABLE `login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `login_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `success` BOOLEAN DEFAULT TRUE,
   PRIMARY KEY(`id`),
 CONSTRAINT FK_LoginUser FOREIGN KEY (user_id)
    REFERENCES users(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `candidate_id` int NOT NULL,
  `number` int NOT NULL,
  `photo` BLOB,
  PRIMARY KEY(`id`),
   CONSTRAINT FK_PhotosCandidate FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `videos`;

CREATE TABLE `videos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `candidate_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
   CONSTRAINT FK_VideosCandidate FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS  `candidate_softskill`;

CREATE TABLE `candidate_softskill` (
   `id` int NOT NULL AUTO_INCREMENT,
   `candidate_id` int NOT NULL,
   `number` int NOT NULL,
   `softskills` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_CandidateSoftSkill FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `candidate_value`;

CREATE TABLE `candidate_value` (
   `id` int NOT NULL AUTO_INCREMENT,
   `candidate_id` int NOT NULL,
   `number` int NOT NULL,
   `valueName` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_CandidateValue FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `candidate_langues`;

  CREATE TABLE `candidate_langues` (
   `id` int NOT NULL AUTO_INCREMENT,
   `candidate_id` int NOT NULL,
   `number` int NOT NULL,
   `langueName` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_CandidateLangues FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `candidate_pop`;

 CREATE TABLE `candidate_pop` (
   `id` int NOT NULL AUTO_INCREMENT,
   `candidate_id` int NOT NULL,
   `number` int NOT NULL,
   `title` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_CandidatePOP FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `candidate_whatElse`;

CREATE TABLE `candidate_whatElse` (
   `id` int NOT NULL AUTO_INCREMENT,
   `candidate_id` int NOT NULL,
    `number` int NOT NULL,
   `diplome` varchar(255) NOT NULL,
  `formation` varchar(255) NOT NULL,
  `lastJob` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_CandidatewhatElse FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `candidate_hobbies`;

CREATE TABLE `candidate_hobbies` (
   `id` int NOT NULL AUTO_INCREMENT,
   `candidate_id` int NOT NULL,
    `number` int NOT NULL,
   `name` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_Candidatehobbies FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `candidate_recommendations`;

CREATE TABLE `candidate_recommendations` (
   `id` int NOT NULL AUTO_INCREMENT,
   `candidate_id` int NOT NULL,
    `number` int NOT NULL,
   `title` varchar(255) NOT NULL,
   `location` varchar(255) NOT NULL,
   `messageText` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_CandidateRecommendations FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `candidate_hardSkills`;

CREATE TABLE `candidate_hardSkills` (
   `id` int NOT NULL AUTO_INCREMENT,
   `candidate_id` int NOT NULL,
    `number` int NOT NULL,
   `hardSkillsName` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_CandidateHardSkills FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `candidate_strength`;

CREATE TABLE `candidate_strength` (
   `id` int NOT NULL AUTO_INCREMENT,
   `candidate_id` int NOT NULL,
    `number` int NOT NULL,
   `strength` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_CandidateStrength FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `candidate_ambition`;

CREATE TABLE `candidate_ambition` (
   `id` int NOT NULL AUTO_INCREMENT,
   `candidate_id` int NOT NULL,
    `number` int NOT NULL,
   `ambition` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_CandidateAmbition FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;







