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
  (err) => {0
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


## About SQLlite
- more like json server or local mongodb. Not like mongodb atlas, MySQL or Postgres
- only available locally

## General sql statements
Here's an **improved SQL syntax reference table** with **placeholders, explanations, and examples** for easy understanding:  

| **Category** | **SQL Statement (With Placeholders)** | **Explanation** | **Example** |
|-------------|--------------------------------------|----------------|-------------|
| **Database Management** | `CREATE DATABASE {database_name};` | Creates a new database. | `CREATE DATABASE shop_db;` |
| | `USE {database_name};` | Selects a database to work with. | `USE shop_db;` |
| | `DROP DATABASE {database_name};` | Deletes a database permanently. | `DROP DATABASE shop_db;` |
| **Table Management** | `CREATE TABLE {table_name} ({column1} {type} {constraints}, {column2} {type} {constraints});` | Creates a new table with specified columns. | `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL);` |
| | `ALTER TABLE {table_name} ADD COLUMN {column_name} {type} {constraints};` | Adds a new column to an existing table. | `ALTER TABLE users ADD COLUMN email TEXT UNIQUE;` |
| | `ALTER TABLE {table_name} DROP COLUMN {column_name};` | Removes a column from a table. | `ALTER TABLE users DROP COLUMN email;` |
| | `DROP TABLE {table_name};` | Deletes a table permanently. | `DROP TABLE users;` |
| **Insert Data** | `INSERT INTO {table_name} ({columns}) VALUES ({values});` | Adds new data (rows) into a table. | `INSERT INTO users (id, name) VALUES (1, 'John');` |
| **Update Data** | `UPDATE {table_name} SET {column} = {new_value} WHERE {condition};` | Modifies existing data in a table. | `UPDATE users SET name = 'Jane' WHERE id = 1;` |
| **Delete Data** | `DELETE FROM {table_name} WHERE {condition};` | Removes rows from a table based on a condition. | `DELETE FROM users WHERE id = 1;` |
| **Querying Data** | `SELECT {columns} FROM {table_name} WHERE {condition};` | Retrieves specific data from a table. | `SELECT name FROM users WHERE id = 1;` |
| | `SELECT * FROM {table_name};` | Selects all columns from a table. | `SELECT * FROM users;` |
| | `SELECT * FROM {table_name} ORDER BY {column} {ASC|DESC};` | Sorts query results in ascending or descending order. | `SELECT * FROM users ORDER BY name ASC;` |
| | `SELECT * FROM {table_name} LIMIT {number};` | Limits the number of rows in a result set. | `SELECT * FROM users LIMIT 5;` |
| **Joins (Combining Data)** | `SELECT {columns} FROM {table1} INNER JOIN {table2} ON {table1}.{key} = {table2}.{key};` | Retrieves matching data from both tables. | `SELECT users.name, orders.id FROM users INNER JOIN orders ON users.id = orders.user_id;` |
| | `SELECT {columns} FROM {table1} LEFT JOIN {table2} ON {table1}.{key} = {table2}.{key};` | Retrieves all rows from the left table and matching rows from the right table. | `SELECT users.name, orders.id FROM users LEFT JOIN orders ON users.id = orders.user_id;` |
| | `SELECT {columns} FROM {table1} RIGHT JOIN {table2} ON {table1}.{key} = {table2}.{key};` | Retrieves all rows from the right table and matching rows from the left table. | `SELECT users.name, orders.id FROM users RIGHT JOIN orders ON users.id = orders.user_id;` |
| **Aggregation (Summarizing Data)** | `SELECT COUNT(*) FROM {table_name};` | Counts the number of rows. | `SELECT COUNT(*) FROM users;` |
| | `SELECT SUM({column}) FROM {table_name};` | Returns the sum of a numeric column. | `SELECT SUM(price) FROM orders;` |
| | `SELECT AVG({column}) FROM {table_name};` | Returns the average value of a column. | `SELECT AVG(salary) FROM employees;` |
| | `SELECT {column}, COUNT(*) FROM {table_name} GROUP BY {column};` | Groups results and applies aggregate functions. | `SELECT department, COUNT(*) FROM employees GROUP BY department;` |
| **Constraints & Keys** | `PRIMARY KEY ({column});` | Ensures each row has a unique identifier. | `PRIMARY KEY (id);` |
| | `FOREIGN KEY ({column}) REFERENCES {other_table}({other_column});` | Enforces a link between tables. | `FOREIGN KEY (user_id) REFERENCES users(id);` |
| | `UNIQUE ({column});` | Ensures column values are unique. | `UNIQUE (email);` |
| | `NOT NULL;` | Ensures a column cannot store NULL values. | `name TEXT NOT NULL;` |
| **Indexing (Performance Optimization)** | `CREATE INDEX {index_name} ON {table_name}({column});` | Creates an index to speed up searches. | `CREATE INDEX idx_name ON users(name);` |
| | `DROP INDEX {index_name};` | Removes an index. | `DROP INDEX idx_name;` |
| **Transactions (Ensuring Data Integrity)** | `BEGIN TRANSACTION;` | Starts a transaction. | `BEGIN TRANSACTION;` |
| | `COMMIT;` | Saves the transaction changes. | `COMMIT;` |
| | `ROLLBACK;` | Undoes the transaction changes. | `ROLLBACK;` |
| **User Permissions** | `GRANT {privilege} ON {table_name} TO {user};` | Grants permissions to a user. | `GRANT SELECT ON users TO 'admin';` |
| | `REVOKE {privilege} ON {table_name} FROM {user};` | Removes permissions from a user. | `REVOKE SELECT ON users FROM 'admin';` |

---

### **How to Use This Table?**
1. **Replace `{placeholders}`** with actual values before executing SQL statements.  
2. **Use it as a quick reference** when working with SQL queries.  
3. **Practice each command** in a database system like **MySQL, PostgreSQL, SQLite, or SQL Server**.  

Would you like a **PDF version** of this table for offline use? 😊