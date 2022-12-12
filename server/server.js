require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
// const port = 5000;
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // converts body of client doc to json file

// USER ROUTES

// create user
app.post("/api/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newLogin = await pool.query(
      "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *",
      [username, password]
    );
    res.json(newLogin.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.json({ duplicate: "duplicate" });
  }
});

// get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a user
app.get("/api/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update user's password
app.put("/api/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { oldPassword, newPassword } = req.body;
    await pool.query(
      "UPDATE users SET password = $1 WHERE username = $2 AND password = $3",
      [newPassword, username, oldPassword]
    );
    res.json(`${username}'s password was updated!`);
  } catch (err) {
    console.error(err.message);
  }
});

// delete user
app.delete("/api/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { password } = req.body;
    await pool.query("DELETE FROM notes WHERE username = $1", [username]);
    await pool.query(
      "DELETE FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    res.json(`User "${username}" was deleted`);
  } catch (err) {
    console.error(err.message);
  }
});

// NOTES ROUTES

// create note
app.post("/api/users/:username/notes", async (req, res) => {
  try {
    const { username } = req.params;
    const { id, reminder, description, dateTime } = req.body;
    const newNote = await pool.query(
      "INSERT INTO notes(id, reminder, description, datetime, username) VALUES($1, $2, $3, $4, $5)",
      [id, reminder, description, dateTime, username]
    );
    res.json(newNote.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all notes
app.get("/api/users/:username/notes", async (req, res) => {
  try {
    const { username } = req.params;
    const allNotes = await pool.query(
      "SELECT * FROM notes WHERE username = $1",
      [username]
    );
    res.json(allNotes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// update note
app.put("/api/users/:username/notes/:id", async (req, res) => {
  try {
    const { username, id } = req.params;
    const { newId, reminder, description, dateTime } = req.body;
    await pool.query(
      "UPDATE notes SET id = $1, reminder = $2, description = $3, datetime = $4 WHERE id = $5 AND username = $6",
      [newId, reminder, description, dateTime, id, username]
    );
    res.json(`Note ${id} was updated!`);
  } catch (err) {
    console.error(err.message);
  }
});

// delete note
app.delete("/api/users/:username/notes/:id", async (req, res) => {
  try {
    const { username, id } = req.params;
    await pool.query("DELETE FROM notes WHERE id = $1 AND username = $2", [
      id,
      username,
    ]);
    res.json(`Deleted note ${id}!`);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
