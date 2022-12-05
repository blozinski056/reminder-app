CREATE DATABASE reminderapp;

CREATE TABLE users(
  username VARCHAR(255),
  password VARCHAR(255),
  PRIMARY KEY (username),
  UNIQUE (username)
);

CREATE TABLE notes(
  noteid SERIAL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  datetime VARCHAR(255) NOT NULL,
  username VARCHAR(255),
  FOREIGN KEY (username) REFERENCES users(username)
);