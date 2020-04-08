/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.
 *
 *  If you setup a password, you will have to add a "-p": mysql -u root -p < schema.sql
 */

DROP DATABASE IF EXISTS movie_db;

CREATE DATABASE movie_db;

USE movie_db;

CREATE TABLE movies (
  id INT AUTO_INCREMENT NOT NULL,
  item_title VARCHAR(100) NOT NULL,
  watched BOOLEAN NOT NUll,
  PRIMARY KEY (id)
);

INSERT INTO movies (item_title, watched) VALUES ('Mean Girls', true);
INSERT INTO movies (item_title, watched) VALUES ('Hackers', false);
INSERT INTO movies (item_title, watched) VALUES ('The Grey', false);
INSERT INTO movies (item_title, watched) VALUES ('Sunshine', true);
INSERT INTO movies (item_title, watched) VALUES ('Ex Machina', false);