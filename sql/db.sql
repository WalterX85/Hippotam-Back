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
 `telephone` varchar(100) NOT Null,
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
 `telephone` varchar(100) NOT Null,
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


DROP TABLE IF EXISTS  `softskills`;

CREATE TABLE `softskills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `softskills` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

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

CREATE TABLE `candidate_softskill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `linked_number` int NOT null,
   `softskill_id` int NOT NULL,
   `candidate_id` int NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT FK_CandidateSoftSkill FOREIGN KEY (candidate_id)
    REFERENCES candidates(id),
 CONSTRAINT FK_SoftskillCandidate FOREIGN KEY (softskill_id)
    REFERENCES softskills(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `my_values`;

CREATE TABLE `my_values` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

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

DROP TABLE IF EXISTS `candidate_value`;

CREATE TABLE `candidate_value` (
   `id` int NOT NULL AUTO_INCREMENT,
   `value_id` int NOT NULL,
   `candidate_id` int NOT NULL,
  PRIMARY KEY(`id`),
 CONSTRAINT FK_ValueCandidate FOREIGN KEY (value_id)
    REFERENCES my_values(id),
  CONSTRAINT FK_CandidateValue FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `langues`;

CREATE TABLE `langues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

INSERT INTO 
 `langues`
VALUES
  (1, 'anglaisA1'),
  (2, 'anglaisA2'),
  (3, 'anglaisB1'),
  (4, 'anglaisB2'),
  (5, 'anglaisC1'),
  (6, 'anglaisC2'),
  (7, 'allemandA1'),
  (8, 'allemandA2'),
  (9, 'allemandB1'),
  (10, 'allemandB2'),
  (11, 'allemandC1'),
  (12, 'allemandC2'),
  (13, 'espanolA1'),
  (14, 'espanolA2'),
  (15, 'espanolB1'),
  (16, 'espanolB2'),
  (17, 'espanolC1'),
  (18, 'espanolC2'),
  (19, 'francaisA1'),
  (20, 'francaisA2'),
  (21, 'francaisB1'),
  (22, 'francaisB2'),
  (23, 'francaisC1'),
  (24, 'francaisC2'),
  (25, 'chinoisA1'),
  (26, 'chinoisA2'),
  (27, 'chinoisB1'),
  (28, 'chinoisB2'),
  (29, 'chinoisC1'),
  (30, 'chinoisC2'),
  (31, 'néerlandaiseA1'),
  (32, 'néerlandaiseA2'),
  (33, 'néerlandaiseB1'),
  (34, 'néerlandaiseB2'),
  (35, 'néerlandaiseC1'),
  (36, 'néerlandaiseC2'),
  (37, 'arabeA1'),
  (38, 'arabeA2'),
  (39, 'arabeB1'),
  (40, 'arabeB2'),
  (41, 'arabeC1'),
  (42, 'arabeC2');

DROP TABLE IF EXISTS `candidate_langues`;

  CREATE TABLE `candidate_langues` (
   `id` int NOT NULL AUTO_INCREMENT,
   `langues_id` int NOT NULL,
   `candidate_id` int NOT NULL,
  PRIMARY KEY(`id`),
 CONSTRAINT FK_LanguesCandidate FOREIGN KEY (langues_id)
    REFERENCES langues(id),
  CONSTRAINT FK_CandidateLangues FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `POP`;

CREATE TABLE `POP` (
 `id` int NOT NULL AUTO_INCREMENT,
 `candidate_id` int NOT NULL,
 `name` varchar(255) NOT NULL,
 `location` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `candidate_pop`;

 CREATE TABLE `candidate_pop` (
   `id` int NOT NULL AUTO_INCREMENT,
   `pop_id` int NOT NULL,
   `candidate_id` int NOT NULL,
  PRIMARY KEY(`id`),
 CONSTRAINT FK_POPCandidate FOREIGN KEY (pop_id)
    REFERENCES POP(id),
  CONSTRAINT FK_CandidatePOP FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `What_Else`;

 CREATE TABLE `What_Else` (
`id` int NOT NULL AUTO_INCREMENT,
`diplome` varchar(255) NOT NULL,
`formation` varchar(255) NOT NULL,
`lastJob` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `candidate_whatElse`;

CREATE TABLE `candidate_whatElse` (
   `id` int NOT NULL AUTO_INCREMENT,
   `whatElse_id` int NOT NULL,
   `candidate_id` int NOT NULL,
  PRIMARY KEY(`id`),
 CONSTRAINT FK_whatElseCandidate FOREIGN KEY (whatElse_id)
    REFERENCES What_Else(id),
  CONSTRAINT FK_CandidatewhatElse FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `hobbies`;

 CREATE TABLE `hobbies` (
`id` int NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `candidate_hobbies`;

CREATE TABLE `candidate_hobbies` (
   `id` int NOT NULL AUTO_INCREMENT,
   `hobbies_id` int NOT NULL,
   `candidate_id` int NOT NULL,
  PRIMARY KEY(`id`),
 CONSTRAINT FK_hobbiesCandidate FOREIGN KEY (hobbies_id)
    REFERENCES hobbies(id),
  CONSTRAINT FK_Candidatehobbies FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `recommendations`;

 CREATE TABLE `recommendations` (
`id` int NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
`location` varchar(255) NOT NULL,
`messageText` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `candidate_recommendations`;

CREATE TABLE `candidate_recommendations` (
   `id` int NOT NULL AUTO_INCREMENT,
   `recommendation_id` int NOT NULL,
   `candidate_id` int NOT NULL,
  PRIMARY KEY(`id`),
 CONSTRAINT FK_RecommendationsCandidate FOREIGN KEY (recommendation_id)
    REFERENCES recommendations(id),
  CONSTRAINT FK_CandidateRecommendations FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `hardSkills`;

 CREATE TABLE `hardSkills` (
`id` int NOT NULL AUTO_INCREMENT,
`hardSkillsName` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `candidate_hardSkills`;

CREATE TABLE `candidate_hardSkills` (
   `id` int NOT NULL AUTO_INCREMENT,
   `hardSkill_id` int NOT NULL,
   `candidate_id` int NOT NULL,
  PRIMARY KEY(`id`),
 CONSTRAINT FK_HardSkillsCandidate FOREIGN KEY (hardSkill_id)
    REFERENCES hardSkills(id),
  CONSTRAINT FK_CandidateHardSkills FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
) ENGINE = InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET = utf8mb4;






