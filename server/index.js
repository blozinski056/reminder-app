const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // req.body

// ROUTES

// create a todo
app.post("/todos", async(req, res) => {
  try {
    const {description} = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES($1) RETURNING *", 
      [description]
    );

    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
  }
})

// get all todos

// get a todo

// update a todo

// delete a todo

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});