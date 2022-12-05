const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json()); // converts body of client doc to json file

// USER ROUTES

// create user
app.post("/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newLogin = await pool.query(
      "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *",
      [username, password]
    );
    res.json(newLogin.rows[0].username);
  } catch (err) {
    console.error(err.message);
  }
});

// get a user ()
app.get("/users/:username", async (req, res) => {
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
app.put("/users/:username", async (req, res) => {
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
app.delete("/users/:username", async (req, res) => {
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
app.post("/users/:username/notes", async (req, res) => {
  try {
    const { username } = req.params;
    const { title, description, dateTime } = req.body;
    const newNote = await pool.query(
      "INSERT INTO notes(title, description, datetime, username) VALUES($1, $2, $3, $4) RETURNING *",
      [title, description, dateTime, username]
    );
    res.json(newNote.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all notes
app.get("/users/:username/notes", async (req, res) => {
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
app.put("/users/:username/notes/:noteid", async (req, res) => {
  try {
    const { username, noteid } = req.params;
    const { title, description, dateTime } = req.body;
    await pool.query(
      "UPDATE notes SET title = $1, description = $2, datetime = $3 WHERE noteid = $4 AND username = $5",
      [title, description, dateTime, noteid, username]
    );
    res.json(`Note ${noteid} was updated!`);
  } catch (err) {
    console.error(err.message);
  }
});

// delete note
app.delete("/users/:username/notes/:noteid", async (req, res) => {
  try {
    const { username, noteid } = req.params;
    await pool.query("DELETE FROM notes WHERE noteid = $1 AND username = $2", [
      noteid,
      username,
    ]);
    res.json(`Deleted note ${noteid}!`);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000...");
});
