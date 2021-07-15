DROP DATABASE IF EXISTS personality;
CREATE DATABASE personality;

USE personality;

DROP TABLE IF EXISTS  `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL UNIQUE,  
  `password` varchar(95) NOT NULL,
  `name` varchar(100) NOT NULL,
 `username` varchar(100) NOT NULL,
 `telephone` varchar(100) NOT NUll,
  PRIMARY KEY(`id`)
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
  `user_id` int NOT NULL,
  `number` int NOT NULL,
  `photo` BLOB,
  PRIMARY KEY(`id`),
   CONSTRAINT FK_PhotoUser FOREIGN KEY (user_id)
    REFERENCES users(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `videos`;

CREATE TABLE `videos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_VideoUser FOREIGN KEY (user_id)
    REFERENCES users(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS  `softskill`;

CREATE TABLE `softskill` (
   `id` int NOT NULL AUTO_INCREMENT,
   `user_id` int NOT NULL,
   `number` int NOT NULL,
   `softskills` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
 CONSTRAINT FK_SoftskillUser FOREIGN KEY (user_id)
    REFERENCES users(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `value`;

CREATE TABLE `value` (
   `id` int NOT NULL AUTO_INCREMENT,
   `user_id` int NOT NULL,
   `number` int NOT NULL,
   `valueName` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_ValueUser FOREIGN KEY (user_id)
    REFERENCES users(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `langue`;

  CREATE TABLE `langue` (
   `id` int NOT NULL AUTO_INCREMENT,
   `user_id` int NOT NULL,
   `number` int NOT NULL,
   `langueName` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_LangueUser FOREIGN KEY (user_id)
    REFERENCES users(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `pop`;

 CREATE TABLE `pop` (
   `id` int NOT NULL AUTO_INCREMENT,
   `user_id` int NOT NULL,
   `number` int NOT NULL,
   `title` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_PopUser FOREIGN KEY (user_id)
    REFERENCES users(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `whatElse`;

CREATE TABLE `whatElse` (
   `id` int NOT NULL AUTO_INCREMENT,
   `user_id` int NOT NULL,
    `number` int NOT NULL,
   `diplome` varchar(255) NOT NULL,
  `formation` varchar(255) NOT NULL,
  `lastJob` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_WhatElseUser FOREIGN KEY (user_id)
    REFERENCES users(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `hobby`;

CREATE TABLE `hobby` (
   `id` int NOT NULL AUTO_INCREMENT,
   `user_id` int NOT NULL,
    `number` int NOT NULL,
   `name` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_hobbiesUser FOREIGN KEY (user_id)
    REFERENCES users(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `recommendation`;

CREATE TABLE `recommendation` (
   `id` int NOT NULL AUTO_INCREMENT,
   `user_id` int NOT NULL,
    `number` int NOT NULL,
   `title` varchar(255) NOT NULL,
   `location` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_RecommendationUser FOREIGN KEY (user_id)
    REFERENCES users(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `hardSkill`;

CREATE TABLE `hardSkills` (
   `id` int NOT NULL AUTO_INCREMENT,
   `user_id` int NOT NULL,
    `number` int NOT NULL,
   `hardSkillsName` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_HardskillUser FOREIGN KEY (user_id)
    REFERENCES users(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `strength`;

CREATE TABLE `strength` (
   `id` int NOT NULL AUTO_INCREMENT,
   `user_id` int NOT NULL,
    `number` int NOT NULL,
   `strength` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_StrengthUser FOREIGN KEY (user_id)
    REFERENCES users(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `ambition`;

CREATE TABLE `ambition` (
   `id` int NOT NULL AUTO_INCREMENT,
   `user_id` int NOT NULL,
    `number` int NOT NULL,
   `ambition` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_AmbitionUser FOREIGN KEY (user_id)
    REFERENCES users(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;







