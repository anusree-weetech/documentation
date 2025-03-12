const express = require("express");
const sqlite3 = require("sqlite3").verbose(); // Import SQLite module
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());


const db = new sqlite3.Database("./database.db", (err) => {
  if (err) console.error(err);
  else console.log("Connected to database");
});

// create tabele, if not exists {table name}, ({column1: name: id, type:integer, primary key}, {column2: name: name, type: text}), more about this(lijk here about mcreating columns) from otehr.md
db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)`);

// Get all users
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a user
app.post("/users", (req, res) => {
  const { name } = req.body;
  db.run("INSERT INTO users (name) VALUES (?)", [name], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
