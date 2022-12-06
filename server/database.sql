CREATE DATABASE reminderapp;

CREATE TABLE users(
  username VARCHAR(255),
  password VARCHAR(255),
  PRIMARY KEY (username)
);

CREATE TABLE notes(
  id VARCHAR(255),
  reminder VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  datetime VARCHAR(255) NOT NULL,
  username VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (username) REFERENCES users(username)
);