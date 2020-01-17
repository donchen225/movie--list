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
  watched VARCHAR(100) NOT NUll,
  PRIMARY KEY (id)
);