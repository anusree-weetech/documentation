# Code syntax

- ### Import SQLite module

```js
const sqlite3 = require("sqlite3").verbose();
```

- ### Create (or open) a database file const

```js
db = new sqlite3.Database("database_filename.db", (err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to database");
  }
});
```

- If filename.db exists, it opens it.
- If not, it creates a new SQLite database file.

- ### Modes (Optional Configuration)- SQLite provides different modes when opening a database:

```javascript
const db = new sqlite3.Database(
  "database.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) console.error(err);
    else console.log("Connected to database");
  }
);
```

| Mode                     | Description                                               |
| ------------------------ | --------------------------------------------------------- |
| `sqlite3.OPEN_READWRITE` | Open for reading and writing (fails if DB doesn’t exist). |
| `sqlite3.OPEN_CREATE`    | Create the database file if it doesn’t exist.             |
| `sqlite3.OPEN_READONLY`  | Open the database in read-only mode.                      |
