Here are the **most commonly used methods** in the `sqlite3` package when working with a database in Node.js:

### 🔹 **Executing SQL Statements**
1. **`db.run(sql, params, callback)`** → Executes an SQL command (for `INSERT`, `UPDATE`, `DELETE`, etc.).
   ```js
   db.run("INSERT INTO users (name) VALUES (?)", ["Alice"], function (err) {
     if (err) return console.error(err.message);
     console.log(`Inserted row with ID: ${this.lastID}`);
   });
   ```
   - `this.lastID` → Gets the ID of the last inserted row.

2. **`db.exec(sql, callback)`** → Runs multiple SQL statements at once (no placeholders).
   ```js
   db.exec(`
     CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);
     INSERT INTO users (name) VALUES ('Bob');
   `, (err) => {
     if (err) console.error(err.message);
   });
   ```

---

### 🔹 **Fetching Data**
3. **`db.all(sql, params, callback)`** → Fetches **all rows** that match the query.
   ```js
   db.all("SELECT * FROM users", [], (err, rows) => {
     if (err) return console.error(err.message);
     console.log(rows); // Array of all users
   });
   ```

4. **`db.get(sql, params, callback)`** → Fetches **only one row** (first match).
   ```js
   db.get("SELECT * FROM users WHERE id = ?", [1], (err, row) => {
     if (err) return console.error(err.message);
     console.log(row); // Single user object
   });
   ```

5. **`db.each(sql, params, rowCallback, completeCallback)`** → Processes rows **one by one**.
   ```js
   db.each("SELECT * FROM users", [], (err, row) => {
     if (err) return console.error(err.message);
     console.log(row);
   }, (err, count) => {
     console.log(`Total rows processed: ${count}`);
   });
   ```

---

### 🔹 **Transaction Handling**
6. **`db.serialize(callback)`** → Ensures that SQL queries inside run **one after another**.
   ```js
   db.serialize(() => {
     db.run("INSERT INTO users (name) VALUES ('Charlie')");
     db.run("INSERT INTO users (name) VALUES ('Dave')");
   });
   ```

7. **`db.parallelize(callback)`** → Allows **parallel execution** of queries (default behavior).
   ```js
   db.parallelize(() => {
     db.all("SELECT * FROM users", [], (err, rows) => {
       if (err) return console.error(err.message);
       console.log(rows);
     });
   });
   ```

---

### 🔹 **Closing the Database**
8. **`db.close(callback)`** → Closes the database connection.
   ```js
   db.close((err) => {
     if (err) return console.error(err.message);
     console.log("Database connection closed.");
   });
   ```

---

### 🔥 **Most Used Methods in Real Apps**
- **`run`** → For `INSERT`, `UPDATE`, `DELETE`
- **`all`** → For fetching multiple rows
- **`get`** → For fetching a single row
- **`close`** → To close the database connection

Would you like a full example combining these methods? 🚀

<hr>

db.run("INSERT INTO table_name (column_name) VALUES (?)", [value], function (err) {
  if (err) {
    // Handle error
    return console.error(err.message);
  }
  // On success, you can access the last inserted row ID
  console.log(`Inserted row with ID: ${this.lastID}`);
});

The `[value]` array is used to safely insert values into the SQL query using **prepared statements**. 

### Purpose of `[value]`:
- It **replaces the `?` placeholder** in the SQL query.
- It **prevents SQL injection** by ensuring that user input is properly escaped.
- It **makes the query dynamic**, allowing different values to be inserted without modifying the SQL string.

### Example:
```javascript
db.run("INSERT INTO users (name) VALUES (?)", ["Alice"], function (err) {
  if (err) return console.error(err.message);
  console.log(`Inserted row with ID: ${this.lastID}`);
});
```
- Here, `["Alice"]` replaces the `?` in `VALUES (?)`, so the final query executed would be:
  ```sql
  INSERT INTO users (name) VALUES ('Alice');
  ```

### Multiple Values:
If the query has multiple placeholders (`?`), you provide an array with multiple values:
```javascript
db.run("INSERT INTO users (name, age) VALUES (?, ?)", ["Bob", 25], function (err) {
  if (err) return console.error(err.message);
  console.log(`Inserted row with ID: ${this.lastID}`);
});
```
This replaces the `?` placeholders in order:
  ```sql
  INSERT INTO users (name, age) VALUES ('Bob', 25);
  ```

Let me know if you need further clarification! 🚀

<hr>

