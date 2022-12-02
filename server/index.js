const express = require("express"); // express library imported
const cors = require("cors"); // cors library imported
const pool = require("./db"); // login info for pg to query from
const app = express(); // express object

// Middleware
app.use(cors());
app.use(express.json()); // turns body of client doc into json file

// ROUTES

// create a todo
app.post("/todos", async (req, res) => {
  try {
    const {description} = req.body; // req.body: body of document sent from client
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES($1) RETURNING *", 
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message)
  }
})

// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const todo = await pool.query(
      "SELECT * FROM todo WHERE tid = $1", 
      [id]
    );
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const {description} = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE tid = $2", 
      [description, id]
    );
    res.json("Todo was updated!")
  } catch (err) {
    console.error(err.message);
  }
})

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE tid = $1", 
      [id]
    );
    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
})

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});