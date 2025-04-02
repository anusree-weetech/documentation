## RDBMS Concepts

- db used for practise here is postgres
- postgres, mysql(oracle), mariadb(mysql ab): opensource rdbms
- sql server(microsoft): also called as microsoft sql server(mssql)

### Running sql files usig psql

- Create a file named suppose example.sql
- In terminal run `psql -U postgres` to connect to postgres
- Run the setup file to create a db: `\i setup.sql \c practise_db`
- Run all other files that you want to work on : `\i whatever.sql`

### 1.1 DBMS vs. RDBMS

#### Characteristics of DBMS

- Hierarchical Database – Data is organized in a tree-like structure.

  - Example: An organization chart, where each department has multiple employees but each employee belongs to only one department.

- Network Database – Uses a graph-like structure where multiple relationships exist between records.

  - Example: A university system, where students can enroll in multiple courses, and each course can have multiple students.

- Object-Oriented Database – Stores data as objects, similar to object-oriented programming.

  - Example: A multimedia database, where images, videos, and documents are stored as objects with properties and methods.

#### Features of RDBMS

- ACID Compliance – Ensures data integrity through Atomicity, Consistency, Isolation, and Durability.

  - Example: A banking system, where transferring money between accounts ensures that either both debit and credit transactions happen or neither occurs.

- SQL Compliance – Uses SQL for data manipulation and querying.

  - Example: A retail database, where SELECT \* FROM products WHERE price > 100 retrieves all products costing more than $100.

#### Differences and Use Cases

- Data Structure : DBMS Uses files, hierarchical, or network models. RDMS Uses tables with rows and columns
- Relationships: DBMS has No relational integrity . RDMS Supports relationships using Primary Keys (PK) and Foreign Keys (FK)
- Query Language: DBMS May not support SQL. RDMS Uses SQL for querying and transactions
- Example: DBMS- Use Case File system for small applications (e.g., XML, JSON storage). RDBMS- Enterprise databases (e.g., MySQL, PostgreSQL for large-scale applications)

### 1.2 Types of Databases based on usage and architecture

1. OLTP (Online Transaction Processing) Database & its Use Cases

   - Definition: OLTP systems handle real-time, high-speed transactions like inserting, updating, and deleting records.

   - Example: A banking system, where customers deposit or withdraw money, and each transaction is immediately recorded in the database.
   - These dbs can be categorised as each other too. A banking system (OLTP) may use a Relational Model (Tables with Primary and Foreign Keys). But a multimedia library (OLTP) could use an Object-Oriented Model.

   - Query Example:
     `UPDATE accounts SET balance = balance - 500 WHERE account_id = 123;`

2. OLAP (Online Analytical Processing) Database & Data Warehousing

   - Definition: OLAP is used for complex analytical queries, aggregating large volumes of data for decision-making.

   - Example: A sales dashboard, where business analysts generate reports to see total sales by region and product category.

   - Query Example:
     `SELECT region, SUM(sales) FROM sales_data GROUP BY region;`

3. Distributed Databases (Sharding, Replication)

   - Definition: A database is spread across multiple servers to improve performance and reliability.

   - Sharding Example: A social media platform, where user data is divided across multiple databases based on user ID to handle millions of users efficiently.

     - Query Example:
       `SELECT * FROM users_01 WHERE user_id = 105;`

   - Replication Example: A global e-commerce website, where copies of product catalogs exist in multiple locations to reduce latency.

   - Replication Setup:
     `CREATE REPLICA FOR DATABASE product_catalog;`

4. Centralized Databases & Their Scalability

   - Definition: A single database server stores all data, making it easier to manage but harder to scale.

   - Example: A university student records system, where all student grades, courses, and details are stored on one central server.

   - Issue: If many students access the system simultaneously, performance may degrade.

   - Scaling Solution: Adding read replicas or switching to a distributed architecture.

### 1.3 ACID Properties with Examples

1. Atomicity – "All or Nothing" Transactions

   - Definition: A transaction must be fully completed or fully rolled back if any part fails.

   - Example:

   - A bank transfer where $500 is moved from Account A to Account B.

   - If the money is deducted from Account A but fails to be credited to Account B, the whole transaction must be rolled back.

   - SQL Example:

   ```sql
   START TRANSACTION;
   UPDATE accounts SET balance = balance - 500 WHERE account_id = 1;
   UPDATE accounts SET balance = balance + 500 WHERE account_id = 2;
   COMMIT;  -- Ensures both updates succeed, or none happen
   ```

2. Consistency – Maintaining a Valid Data State

   - Definition: A transaction must keep the database in a valid and predictable state, following all integrity rules.

   - Example:

     - A university database has a rule that a student must be assigned to at least one course.

     - If a student is inserted without any course, the database should reject the transaction.

   - SQL Example (Using Constraints):

   `INSERT INTO students (student_id, name) VALUES (101, 'Alice');  -- This fails if a course is required`

3. Isolation – Handling Concurrent Transactions

   - Definition: Transactions running simultaneously should not interfere with each other. Isolation levels control how transactions see each other’s changes.

   - Example:

   - Two customers try to buy the last available item in an e-commerce store at the same time.

   - The system must lock the inventory to ensure only one of them successfully purchases it.

   - SQL Example (Using Isolation Level):

   ```sql
   SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
   START TRANSACTION;
   SELECT stock FROM products WHERE product_id = 10 FOR UPDATE;
   UPDATE products SET stock = stock - 1 WHERE product_id = 10;
   COMMIT;
   ```

4. Durability – Ensuring Data Persists

   - Definition: Once a transaction is committed, it must remain saved even if there is a system failure (e.g., power loss).

   - Example:

     - A flight reservation system must ensure that once a ticket is booked, it is not lost even if the server crashes.

   - SQL Example (Using COMMIT to Ensure Persistence):

   ```sql
   START TRANSACTION;
   INSERT INTO bookings (flight_id, passenger_name, seat_number) VALUES (23, 'John Doe', '12A');
   COMMIT;  -- Guarantees the booking is saved permanently
   ```

### 1.4 Transactions & Concurrency Control with Examples

1. Commit & Rollback Mechanisms

   - Definition:

   - Commit: Saves all changes made by a transaction permanently.

   - Rollback: Undoes all changes made within a transaction if an error occurs.

   - Example:

     - A bank withdrawal of $100 from an account:

     - If the withdrawal is successful, commit the transaction.

     - If the system crashes mid-transaction, rollback to prevent incorrect balances.

   - SQL Example:

   ```sql
   START TRANSACTION;
   UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
   -- If something goes wrong (e.g., insufficient funds)
   ROLLBACK;
   -- If everything is correct
   COMMIT;
   ```

2. Locking Mechanisms (Optimistic vs. Pessimistic Locking)

#### A. Optimistic Locking

- Definition:

- Assumes conflicts are rare and does not lock records during transactions.

- Uses versioning to check if data has changed before updating.

- Example:

- Two users try to update the same product price in an e-commerce system.

- If another user changed the price while you were editing, your update fails.

- SQL Example (Using Versioning):

```sql
UPDATE products
SET price = 200, version = version + 1
WHERE product_id = 10 AND version = 3;  -- Update only if version matches
```

#### B. Pessimistic Locking

- Definition:

- Locks the data so no other transactions can modify it until the first transaction finishes.

- Prevents conflicts but can slow down performance.

- Example:

- A flight booking system where only one user can select a seat at a time.

- SQL Example (Using SELECT ... FOR UPDATE to lock rows):

```sql
START TRANSACTION;
SELECT \* FROM seats WHERE seat_number = '12A' FOR UPDATE; -- Lock the seat
UPDATE seats SET status = 'booked' WHERE seat_number = '12A';
COMMIT;
```

3. Deadlocks & Deadlock Prevention

#### A. Deadlock Definition

- A deadlock occurs when two or more transactions are waiting for each other to release locks, causing them to be stuck indefinitely.

#### B. Example of a Deadlock Scenario

- Two transactions trying to update different accounts but locked in opposite order:Transaction A locks Account 1 and waits for Account 2.Transaction B locks Account 2 and waits for Account 1.Neither can proceed, creating a deadlock.

- SQL Example (Deadlock Situation):

```sql
-- Transaction A
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
-- Now waiting for Transaction B to release account_id = 2
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
COMMIT;

-- Transaction B
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 2;
-- Now waiting for Transaction A to release account_id = 1
UPDATE accounts SET balance = balance + 100 WHERE account_id = 1;
COMMIT;
```

#### C. Deadlock Prevention Techniques

- Using Timeouts – Cancel a transaction if it waits too long.

```sql
SET innodb_lock_wait_timeout = 5;  -- Cancel if waiting for more than 5 seconds
```

- Acquiring Locks in the Same Order – Ensure all transactions request resources in a fixed order.

- Using Deadlock Detection Algorithms – Some databases detect deadlocks and automatically roll back one transaction.

### 2.1 Normalization & Denormalization in RDBMS

- normalisation: to avoid data duplication, reduce storage costs, improve transaction performance
- denormalisation: improve read performance, reducing joins in large queries, avoiding slow resposne times, better scalability in distributedsystems (eg: Social media feeds need fast retrieval, even if some data is duplicated)

#### 1NF (First Normal Form) – Eliminating Repeating Groups

- Fixes: Data stored in multiple values within a single column.
- Each column must contain atomic (indivisible) values.

- No repeating groups (no multiple values in a single cell).
- not first normal form:
  |a|b|c|
  |--|--|--|
  |1|name1|subject1, subject2|
  |2|name2|subject3, subject4|
- 1nf, first normal form
  |a|b|c|
  |--|--|--|
  |1|name1|subject1|
  |1|name1| subject2|
  |2|name2|subject3|
  |2|name2|subject4|

#### 2NF (Second Normal Form) – Removing Partial Dependencies

- Must already be in 1NF.

- No partial dependencies (A non-key column should not depend on part of a composite key).
- not 2nf, second normal form (but is 1nf) (has quantity depedning on names/ids - partial dependencies)
  |a|b|c|d|
  |--|--|--|--|
  |1|name1|subject1|quantity1|
  |1|name1| subject2|quantity1|
  |2|name2|subject3|quantity2|
  |2|name2|subject4|quantity2|

  - 2nf, second normal form and 1nf (contains seperate tables)
    |a|b|c|
    |--|--|--|
    |1|name1|subject1|
    |1|name1| subject2|
    |2|name2|subject3|
    |2|name2|subject4|

    | a   | d         |
    | --- | --------- |
    | 1   | quantity1 |
    | 2   | quantity2 |

#### 3NF (Third Normal Form) – Eliminating Transitive Dependencies

- Must already be in 2NF.

- No transitive dependencies (A non-key column should not depend on another non-key column).
- Fixes: Data that depends on a non-primary key column.
- exmaple: Supplier_Location depends on Supplier, NOT Order_ID.
  | Order_ID | Product | Supplier | Supplier_Location |  
  |----------|---------|----------|--------------------|  
  | 1 | Apple | FreshFarms | USA |  
  | 2 | Banana | TropicGrow | India |
- 3NF - Separate Supplier Info Again
  | Order_ID | Product | Supplier |  
  |----------|---------|----------|  
  | 1 | Apple | FreshFarms |  
  | 2 | Banana | TropicGrow |

  | Supplier   | Supplier_Location |
  | ---------- | ----------------- |
  | FreshFarms | USA               |
  | TropicGrow | India             |

#### 3.5NF BCNF (Boyce-Codd Normal Form) - Handling Overlapping Candidate Keys

- Fixes: Tables where non-primary keys determine other keys.
- not bcnf : Instructor depends on Course, not Student_ID.
  | Student_ID | Course | Instructor |  
  |------------|---------|------------|  
  | 1 | Math | Prof. A |  
  | 2 | Math | Prof. A |  
  | 3 | History | Prof. B |
- bcnf
  | Student_ID | Course |  
   |------------|---------|  
   | 1 | Math |  
   | 2 | Math |  
   | 3 | History |

  | Course  | Instructor |
  | ------- | ---------- |
  | Math    | Prof. A    |
  | History | Prof. B    |

#### 4NF (Fourth Normal Form) – Eliminating Multi-Valued Dependencies

- Fixes: When one column depends on two separate facts independently.
- not 4nf (Sport and Club are independent but stored together.)
  | Student_ID | Sport | Club |  
  |------------|--------|-----------|  
  | 1 | Soccer | Music Club |  
  | 1 | Soccer | Dance Club |  
  | 1 | Tennis | Music Club |
- 4nf Split into Two Tables
  | Student_ID | Sport |  
  |------------|--------|  
  | 1 | Soccer |  
  | 1 | Tennis |

| Student_ID | Club       |
| ---------- | ---------- |
| 1          | Music Club |
| 1          | Dance Club |

#### 5NF (Fifth Normal Form) – Eliminating Join Dependencies

- Fixes: Data that requires complex joins but is still redundant.
- not 5nf
  - Actors, Movies, and Roles are three separate facts combined in one table.
  - Repeating Actor-Movie and Movie-Role information.
    | Actor | Movie | Role |  
    |--------|------------|------------|  
    | Tom | Mission X | Lead |  
    | Tom | Mission X | Producer |  
    | Tom | Sky High | Lead |
- 5nf
  | Actor | Movie |  
  |--------|-----------|  
  | Tom | Mission X |  
  | Tom | Sky High |

  | Movie     | Role     |
  | --------- | -------- |
  | Mission X | Lead     |
  | Mission X | Producer |

  | Actor | Role     |
  | ----- | -------- |
  | Tom   | Lead     |
  | Tom   | Producer |

### 2.2 Partitioning in Databases

1.  Horizontal Partitioning (Dividing Rows)

- Splitting a table by rows based on a criterion like date, region, or ID range.

- Commonly used in large datasets to improve query performance.
- querying will be as usual, but justtaht now the db searches only the partitioned area
- done by manually partitoining using the ` partion of` command

- Without Partitioning will take a lot of time:
  `SELECT * FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-01-31';`
- after partitioning for the same query it returns faster results

```sql
CREATE TABLE orders_2023 PARTITION OF orders
FOR VALUES FROM ('2023-01-01') TO ('2023-12-31');

CREATE TABLE orders_2024 PARTITION OF orders
FOR VALUES FROM ('2024-01-01') TO ('2024-12-31');

--query
SELECT * FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-01-31
```

2. Vertical Partitioning (Dividing Columns)

- Splitting a table by columns to reduce the size of frequently accessed data.

- Useful when some columns are rarely used or contain large data (e.g., JSON, images).
- done by manually sopliting unpartitioned table into multiple tables

```sql
CREATE TABLE users_basic (
    user_id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT
);

CREATE TABLE users_profile (
    user_id INT PRIMARY KEY REFERENCES users_basic(user_id),
    profile_data JSONB
);
```

3.  Partition Indexing & Query Optimization

- Partition Indexing ensures that queries only scan relevant partitions, improving performance.

- Query Optimization happens because indexes are smaller and searches are faster.

- Problem Without Indexing: Even with partitioning, a query might still scan all partitions, reducing efficiency:`SELECT \* FROM orders WHERE order_id = 12345;`
- Solution: Create Index on Partitioned Column
  Create an index on each partition to speed up lookups:
  `CREATE INDEX idx_orders_2024 ON orders_2024 (order_id);`

### 2.3 Views in Databases (With Examples)

- Views are virtual tables in a database, allowing you to store queries and access them like a table.
- Views are more like templates or predefined queries that can be reused, rather than virtual tables in the strictest sense.

#### 1. Simple Views vs. Complex Views

##### 🔹 Simple Views:

- reated using a single SELECT query without joins or complex operations.

- usually represents a single table.

- Example: Simple View (Single Table)

```sql
CREATE VIEW employee_view AS
SELECT employee_id, name, department
FROM employees;
```

- Now, you can query the view just like a table:

```sql
SELECT * FROM employee_view;
```

##### 🔹 Complex Views:

- can contain multiple tables, joins, aggregations, or subqueries.

- represent more sophisticated queries.

- Example: Complex View (Multiple Tables and Join)

```sql
CREATE VIEW sales_summary AS
SELECT o.order_id, o.customer_id, SUM(oi.quantity \* oi.price) AS total_price
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id, o.customer_id;
```

#### 2. Materialized Views & Performance Benefits

##### 🔹 What are Materialized Views?

- stores the result of the query physically in the database.

- does not require re-executing the query each time it is accessed, improving performance, especially for expensive operations. but it requires refreshing/updating quite often.

- Example: Creating a Materialized View

```sql
CREATE MATERIALIZED VIEW product_sales_summary AS
SELECT product_id, SUM(quantity) AS total_sales
FROM order_items
GROUP BY product_id;
```

##### 🔹 Performance Benefits:

- The result of product_sales_summary is stored physically, so future queries against it are much faster.

- The trade-off: You need to refresh the materialized view periodically to ensure data is up-to-date.
- To refresh the materialized view (recalculate its data), you can use:

```sql
REFRESH MATERIALIZED VIEW product_sales_summary;
```

#### 3. Updatable vs. Non-Updatable Views

##### 🔹 Updatable Views:

- Updatable views allow you to perform DML operations (data manipultaion operations: INSERT, UPDATE, DELETE) directly on them.

- They must be based on simple queries without complex joins or aggregations.

- Example: Updatable View (Single Table)

```sql
CREATE VIEW employee_view AS
SELECT employee_id, name, department
FROM employees;
```

- You can update the employee_view:

```sql
UPDATE employee_view
SET department = 'HR'
WHERE employee_id = 1;
```

- The changes will be reflected in the employees table since the view is directly tied to a single table.

##### 🔹 Non-Updatable Views:

- created using complex queries involving joins, aggregations, or subqueries.

- cannot be directly updated, but you can query them.

- Example: Non-Updatable View (Join & Aggregation)

```sql
CREATE VIEW sales_summary AS
SELECT o.order_id, o.customer_id, SUM(oi.quantity \* oi.price) AS total_price
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id, o.customer_id;
```

- Attempting to update or insert directly into sales_summary will result in an error because of its complex nature. Instead, you'll have to update the underlying tables (orders and order_items).

### 3.1 Constraints on Records

#### 1️⃣ UNIQUE Constraint (Ensuring Uniqueness)

- Ensures that values in a column (or combination of columns) are unique across all records.

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email TEXT UNIQUE -- Ensures no duplicate emails
);
```

#### 2️⃣ NOT NULL Constraint (Ensuring Mandatory Data)

- Ensures that a column cannot have NULL (empty) values.

```sql
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL, -- Name must always be provided
    department TEXT
);
```

### 3.2 Transactions & Row Locking

- locakng a method in transactions to keep concurrency until the transaction is over

#### 1️⃣ Row-Level Locking vs. Table-Level Locking

- Row-Level Locking locks only the affected rows, allowing better concurrency.

- Table-Level Locking locks the entire table, preventing any other modifications until the transaction completes.

##### Row level locking

- postgres(implicit: locaking till the update is going on):

```sql
BEGIN;
UPDATE employees SET salary = salary + 500 WHERE employee_id = 1; -- Locks only this row
COMMIT;
```

- postgres(using UPDATE) (explicit: locking it unless release manually. even if the update is not going on)

```sql
BEGIN;
SELECT * FROM employees WHERE employee_id = 1 FOR UPDATE;
-- Locks the row even if no update is done yet.
COMMIT;

```

- mysql:

```sql
START TRANSACTION;
UPDATE employees SET salary = salary + 500 WHERE employee_id = 1; -- Locks only this row
COMMIT;
```

##### Table level locking

- postgres:

```sql
BEGIN;
LOCK TABLE employees IN ACCESS EXCLUSIVE MODE;  -- Fully locks the table
UPDATE employees SET salary = salary + 500;  -- No other transaction can access the table
COMMIT;
```

- mysql:

```sql
LOCK TABLES employees WRITE;  -- Prevents other transactions from reading/writing
UPDATE employees SET salary = salary + 500; -- Locks entire table
UNLOCK TABLES;  -- Releases the lock
```

#### 2️⃣ Dirty Reads, Phantom Reads, and Non-Repeatable Reads

| Issue               | Explanation                                                                                                             | Example                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Dirty Read          | Reading uncommitted data.                                                                                               | A transaction sees a salary update before it's committed, but it gets rolled back.                    |
| Non-Repeatable Read | A row changes between reads. If only updation of rows, it is called non repeatable read                                 | A user reads a price, but another transaction updates it before the second read.                      |
| Phantom Read        | New rows appear between queries. If no updation, instead there is addition and deletion, then it is called phantom read | A SELECT COUNT(\*) returns different results when run twice in the same transaction due to an insert. |

##### Dirty Read (Allowed in READ UNCOMMITTED - PostgreSQL Doesn't Support It Natively)

- PostgreSQL does NOT allow dirty reads because it does not support the READ UNCOMMITTED isolation level. However, in databases like MySQL (with InnoDB), a dirty read can occur.

- MySQL Example
- Session 1 (Transaction 1) - Update Without Committing

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
BEGIN;
UPDATE employees SET salary = salary + 500 WHERE employee_id = 1;
-- Do NOT commit yet
```

- Session 2 (Transaction 2) - Read Uncommitted Data

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
BEGIN;
SELECT salary FROM employees WHERE employee_id = 1;
-- This might show the updated salary even though Transaction 1 has not committed
COMMIT;
```

- Session 1 (Transaction 1) - Rollback

```sql
ROLLBACK;
-- Now, the salary update is undone, but Session 2 already saw the uncommitted data!
```

- 🔹 Impact: Session 2 saw data that was later rolled back = Dirty Read.

##### 2️⃣ Non-Repeatable Read (Allowed in READ COMMITTED Isolation Level - PostgreSQL Default)

- Occurs when a row changes between two reads in the same transaction.

- Session 1 (Transaction 1) - First Read

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
BEGIN;
SELECT salary FROM employees WHERE employee_id = 1;
-- Assume the salary is 5000
```

- Session 2 (Transaction 2) - Modify the Same Row

```sql
BEGIN;
UPDATE employees SET salary = 5500 WHERE employee_id = 1;
COMMIT;
```

- Session 1 (Transaction 1) - Second Read

```sql
SELECT salary FROM employees WHERE employee_id = 1;
-- Now the salary is 5500 (different from first read in the same transaction)
COMMIT;
```

🔹 Impact: The same query returned different results within one transaction = Non-Repeatable Read.

##### 3️⃣ Phantom Read (Allowed in REPEATABLE READ, but prevented in SERIALIZABLE)

- Occurs when new rows appear between two queries in the same transaction.

- Session 1 (Transaction 1) - First Count Query

```sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN;
SELECT COUNT(_) FROM employees;
-- Assume count = 5
```

- Session 2 (Transaction 2) - Insert a New Row

```sql
BEGIN;
INSERT INTO employees (name, salary) VALUES ('New Employee', 6000);
COMMIT;
```

- Session 1 (Transaction 1) - Second Count Query

```sql
SELECT COUNT(_) FROM employees;
-- Now count = 6 (different from first read in the same transaction)
COMMIT;
```

- 🔹 Impact: The second query saw a new row inserted by another transaction = Phantom Read.

- How to Prevent Them?
  |Issue| Isolation Level That Prevents It|
  |--|--|
  |Non-Repeatable Read| REPEATABLE READ or higher|
  |Phantom Read |SERIALIZABLE|

### 3.3 Auto-incremented IDs

#### 1️⃣ AUTO_INCREMENT (MySQL, MariaDB)

- Automatically generates an incremental unique ID for new rows.
  -mysql

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);
```

- psql

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);
```

- IDs will be 1, 2, 3, ... automatically.

#### 2️⃣ Sequences (PostgreSQL, Oracle)

- Manages unique IDs using a separate sequence.
- can be customised

```sql
CREATE SEQUENCE user_id_seq START 100 INCREMENT 1;
CREATE TABLE users (
    id INT PRIMARY KEY DEFAULT nextval('user_id_seq'),
    name TEXT
);
--returns sequence form 100 onwards
```

- Works like AUTO_INCREMENT but more flexible.

#### 3️⃣ UUIDs as Primary Keys

- Unique identifiers for distributed systems where incremental IDs might collide.

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
name TEXT
);
-- returns with uuid type id
```

- Ensures global uniqueness, but UUIDs are longer and slower than integers.

## 4. Column (Field, Attribute)

### 4.1 Data Types

#### 1️⃣ Numeric Data Types

- Used for storing numbers.
- `INTEGER` (whole numbers), `FLOAT` (approximate decimals), `DECIMAL` (precise decimals).

```sql
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    price DECIMAL(10,2),  -- Precise up to 2 decimal places
    discount FLOAT        -- Approximate decimal value
);
```

#### 2️⃣ String Data Types

- `VARCHAR(n)` (fixed max length) vs `TEXT` (unlimited length).

```sql
CREATE TABLE users (
    username VARCHAR(50) NOT NULL,
    bio TEXT  -- Allows long text descriptions
);
```

#### 3️⃣ Date & Time Data Types

- `DATE` (YYYY-MM-DD), `TIMESTAMP` (with time).

```sql
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    order_date DATE DEFAULT CURRENT_DATE,
    delivery_time TIMESTAMP DEFAULT NOW()
);
```

#### 4️⃣ JSON, XML, and Array Data Types

- Store complex data formats.

- PostgreSQL JSON Example:

```sql
CREATE TABLE logs (
    log_id SERIAL PRIMARY KEY,
    log_data JSONB
);

INSERT INTO logs (log_data)
VALUES ('{"user": "Alice", "action": "login"}');
```

- Array Data Type (PostgreSQL Example):

```sql
CREATE TABLE student_courses (
    student_id SERIAL PRIMARY KEY,
    courses TEXT[]
);

INSERT INTO student_courses (courses) VALUES (ARRAY['Math', 'Science']);
```

### 4.2 Default Values & Constraints

#### 1️⃣ DEFAULT Values (Setting Predefined Column Values)

```sql
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    department VARCHAR(50) DEFAULT 'General'
);
```

- If no department is provided, it defaults to `'General'`.

#### 2️⃣ CHECK Constraint (Ensuring Logical Data Constraints)

```sql
CREATE TABLE accounts (
    account_id SERIAL PRIMARY KEY,
    balance DECIMAL(10,2) CHECK (balance >= 0)  -- No negative balances
);
```

- Prevents negative balances.

---

### 4.3 Computed Columns

#### 1️⃣ Virtual vs. Persisted Computed Columns

- Virtual (Calculated on the Fly, Not Stored in DB)- mysql, mariaDB, not in postgres

```sql
CREATE TABLE sales (
    price DECIMAL(10,2),
    quantity INT,
    total_price DECIMAL GENERATED ALWAYS AS (price * quantity) VIRTUAL
);
```

- persisted (stored in DB)
- postgres code

```sql
CREATE TABLE sales (
    price DECIMAL(10,2),
    quantity INT,
    total_price DECIMAL GENERATED ALWAYS AS (price * quantity) STORED
);
```

- The **`total_price`** is always up-to-date but not physically stored.

#### 2️⃣ Expression-Based Computed Columns

- in mysql/mariadb since postgres do no support `generated always as`

```sql
CREATE TABLE employees (
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    full_name VARCHAR(100) GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED
);
```

- `full_name` automatically combines `first_name` and `last_name`.

### 5.1 Logical vs. Physical Schema

#### 1️⃣ Logical Schema (Conceptual Representation)

- Defines what data is stored and how it relates but does not concern physical storage.

- Used for designing the database structure.
- This defines the logical structure but does not specify how data is stored internally.
- Example in SQL (Logical Table Design):

```sql
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    order_date DATE NOT NULL
);
```

### 2️⃣ Physical Schema (Storage & Indexing)

- Defines how data is stored on disk.

- Includes indexing, partitioning, and optimization strategies.

- Example: Physical Storage with Indexing
- called as physical schema because it deals with indexes, partitions, and storage engines, which optimize access speed. deals with how data is actually stored on disk.

```sql
CREATE INDEX idx_customer_email ON customers(email);
✅ This creates an index on the email column to speed up lookups.

-- Create a partitioned orders table based on order_date for performance optimization.
CREATE TABLE orders_2023 PARTITION OF orders
    FOR VALUES FROM ('2023-01-01') TO ('2023-12-31');
CREATE TABLE orders_2024 PARTITION OF orders
    FOR VALUES FROM ('2024-01-01') TO ('2024-12-31');

    -- Add an index on customer_id in the orders table to speed up foreign key lookups.
CREATE INDEX idx_orders_customer_id ON orders (customer_id);

-- Cluster the customers table based on the customer_id for performance improvements.
CLUSTER customers USING idx_customer_email;

-- We could also consider adding tablespaces for the storage and optimization of large tables.
CREATE TABLESPACE fast_storage LOCATION '/mnt/data';

-- Moving the 'orders' table to a separate tablespace for better disk performance.
ALTER TABLE orders SET TABLESPACE fast_storage;
```

### 5.2 Database Design Models

#### 1️⃣ ER Model (Entity-Relationship Model)

- Conceptual representation of data using entities (tables), attributes (columns), and relationships.

- Used during database design before implementation.

- Example: ER Diagram Representation

  - Entities: Customer, Order, Product

  - Relationships:

    - A customer places multiple orders.

    - An order contains multiple products.

- Example SQL (Translating ER Model to Tables):

```sql
CREATE TABLE customers (
customer_id SERIAL PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(100) UNIQUE
);

CREATE TABLE orders (
order_id SERIAL PRIMARY KEY,
customer_id INT REFERENCES customers(customer_id),
order_date DATE NOT NULL
);
```

- ER models help design relationships before database implementation.

#### 2️⃣ Relational Model (Tables & Keys)

- Uses tables (relations), rows (records), and columns (attributes).

- Uses Primary Keys (PK) and Foreign Keys (FK) to enforce relationships.

- Example: Relational Table Design

```sql
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    department_id INT REFERENCES departments(department_id)
);

CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100)
);
```

- Relational models ensure data integrity using keys and constraints.

#### 3️⃣ Star Schema & Snowflake Schema (For Data Warehouses)

- Fact Table: Stores numerical data (e.g., sales, revenue).

- Dimension Tables: Store descriptive data (e.g., customers, products, time).

##### 🔹 Star Schema (Simpler, faster queries)

- Used for analytics and reporting in data warehouses.
- therefore it is called a data warehouse design.

- Data Warehouse: specialized type of database designed for the analysis and reporting of large volumes of data. Used to store hiostorical data in business intelligence(BI), data mining etc
- Fact Table connects to multiple dimension tables directly.
- this is a denormalised design where dimension tables are typically flat(only one level of normalisation), making simple to query but causes redundancy

- Example:

```sql
CREATE TABLE fact_sales (
    sale_id SERIAL PRIMARY KEY,
    product_id INT,
    customer_id INT,
    sale_date DATE,
    amount NUMERIC(10,2),
    FOREIGN KEY (product_id) REFERENCES dim_product(product_id),
    FOREIGN KEY (customer_id) REFERENCES dim_customer(customer_id)
);
```

```
fact_sales
├── sales_amount (numeric)
├── quantity_sold (numeric)
├── time_key (foreign key)
├── product_key (foreign key)
└── customer_key (foreign key)

dimension_time
├── time_key (primary key)
├── date
└── month

dimension_product
├── product_key (primary key)
├── product_name
└── category

dimension_customer
├── customer_key (primary key)
├── customer_name
└── region
```

##### 🔹 Snowflake Schema (Normalized, less redundancy)

- normalised version of star schema
- Dimension tables are further normalized into sub-dimensions.
- Reduces storage/redundancy but requires more complex joins in queries, and may require joining multiple tables.
- generally involves 3rd normalised form.

- Example:

```sql
CREATE TABLE dim_location (
    location_id SERIAL PRIMARY KEY,
    city VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50)
);

CREATE TABLE dim_store (
    store_id SERIAL PRIMARY KEY,
    store_name VARCHAR(100),
    location_id INT REFERENCES dim_location(location_id)
);
```

```
fact_sales
├── sales_amount (numeric)
├── quantity_sold (numeric)
├── time_key (foreign key)
├── product_key (foreign key)
└── customer_key (foreign key)

dimension_time
├── time_key (primary key)
├── date
└── month

dimension_product
├── product_key (primary key)
├── product_name
└── product_category_key (foreign key)

dimension_product_category
├── product_category_key (primary key)
└── category_name

dimension_customer
├── customer_key (primary key)
├── customer_name
└── region_key (foreign key)

dimension_region
├── region_key (primary key)
└── region_name
```

### 5.3 Relationships

1. One-to-One (1:1) Relationship:
   - Definition: Each record in one table is linked to exactly one record in another table.

```sql
-- Create a table for Persons
CREATE TABLE persons (
    person_id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

-- Create a table for Passports
CREATE TABLE passports (
    passport_id SERIAL PRIMARY KEY,
    person_id INT,
    passport_number VARCHAR(20),
    FOREIGN KEY (person_id) REFERENCES persons(person_id)
);

-- Insert sample data
INSERT INTO persons (name) VALUES ('Alice'), ('Bob');
INSERT INTO passports (person_id, passport_number) VALUES (1, 'A12345'), (2, 'B67890');
```

- Here, each person has one passport, and each passport belongs to exactly one person.

2. One-to-Many (1:M) Relationship:

- Definition: One record in the first table can be related to multiple records in the second table.

```sql
-- Create a table for Departments
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100)
);

-- Create a table for Employees
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    employee_name VARCHAR(100),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Insert sample data
INSERT INTO departments (department_name) VALUES ('HR'), ('Engineering');
INSERT INTO employees (employee_name, department_id) VALUES ('Alice', 1), ('Bob', 2), ('Charlie', 2);
```

- Here, one department can have many employees, but each employee is assigned to exactly one department.

3. Many-to-Many (M:M) Relationship:

- Definition: Records in the first table can be related to multiple records in the second table, and records in the second table can be related to multiple records in the first table.

```sql
-- Create a table for Students
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(100)
);

-- Create a table for Courses
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(100)
);

-- Create a junction table for enrollment (Many-to-Many)
CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    PRIMARY KEY (student_id, course_id)
);

-- Insert sample data
INSERT INTO students (student_name) VALUES ('Alice'), ('Bob');
INSERT INTO courses (course_name) VALUES ('Math'), ('History');
INSERT INTO enrollments (student_id, course_id) VALUES (1, 1), (1, 2), (2, 1);
```

- a student can be enrolled in many courses, and a course can have many students.

### 6.1 Single-column vs. Composite PKs

#### Single-column Primary Keys (PK):

- A single column is used as the primary key to uniquely identify records.

  ```sql
  CREATE TABLE employees (
      employee_id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      department VARCHAR(50)
  );
  ```

  | employee_id | name    | department  |
  | ----------- | ------- | ----------- |
  | 1           | Alice   | HR          |
  | 2           | Bob     | Engineering |
  | 3           | Charlie | Marketing   |
  | 4           | David   | IT          |

  - Here, `employee_id` is the primary key and uniquely identifies each row in the `employees` table.

#### Composite Primary Keys (PK):

- A primary key that uses multiple columns to uniquely identify a record.

  ```sql
  CREATE TABLE orders (
      order_id INT,
      product_id INT,
      quantity INT,
      PRIMARY KEY (order_id, product_id)
  );
  ```

  | order_id | product_id | quantity |
  | -------- | ---------- | -------- |
  | 1        | 101        | 2        |
  | 1        | 102        | 5        |
  | 2        | 103        | 3        |
  | 2        | 101        | 1        |
  | 3        | 104        | 4        |

  - The primary key is a combination of `order_id` and `product_id`, ensuring that each order-product combination is unique.

### 6.2 Natural vs. Surrogate Keys

#### Natural Keys (Real-World Identifiers):

- Keys that naturally exist in the real world and can be used to identify records (e.g., national ID numbers, email addresses).

  ```sql
  CREATE TABLE users (
      email VARCHAR(255) PRIMARY KEY,
      name VARCHAR(100)
  );
  ```

  - In this example, the email address serves as the natural key.

#### Surrogate Keys (System-Generated Identifiers):

- Artificially created keys that have no meaning outside the database. These keys are often auto-incremented or system-generated identifiers.

  ```sql
  CREATE TABLE products (
      product_id SERIAL PRIMARY KEY,
      product_name VARCHAR(100),
      price DECIMAL(10, 2)
  );
  ```

  - The `product_id` is a surrogate key, automatically generated by the database.

### 6.3 Auto-incrementing Keys

#### SERIAL (PostgreSQL):

- A special data type in PostgreSQL for auto-incrementing integer values.

  ```sql
  CREATE TABLE customers (
      customer_id SERIAL PRIMARY KEY,
      name VARCHAR(100)
  );
  ```

  - Here, `customer_id` is an auto-incrementing field in PostgreSQL.

#### AUTO_INCREMENT (MySQL):

- A keyword in MySQL for auto-incrementing integer values.

  ```sql
  CREATE TABLE employees (
      employee_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100)
  );
  ```

  - `employee_id` will automatically increment with each new row in MySQL.

#### Identity Columns (SQL Server):

- An auto-increment feature in SQL Server, similar to `AUTO_INCREMENT` and `SERIAL`.

  ```sql
  CREATE TABLE orders (
      order_id INT IDENTITY(1,1) PRIMARY KEY,
      order_date DATE
  );
  ```

  - In SQL Server, the `order_id` is an identity column, starting from 1 and incrementing by 1 with each new row.

### 7. Foreign Key (FK)

#### 7.1 Cascading Actions

- Foreign key constraints help manage the relationship between tables and ensure referential integrity. Cascading actions control what happens to the child records when the parent record is deleted or updated.

##### CASCADE (Delete/Update Related Records)

- CASCADE ensures that when a parent record is deleted or updated, the corresponding child records are also deleted or updated automatically.

```sql
CREATE TABLE orders (
order_id SERIAL PRIMARY KEY,
customer_id INT,
order_date DATE,
FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- When a customer is deleted, their orders will also be deleted automatically.
```

##### SET NULL (Nullifying Foreign Key on Parent Deletion)

- SET NULL sets the foreign key in the child table to NULL when the corresponding parent record is deleted.

```sql
CREATE TABLE orders (
order_id SERIAL PRIMARY KEY,
customer_id INT,
order_date DATE,
FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE SET NULL
);

-- When a customer is deleted, the `customer_id` in the orders table is set to `NULL`.
```

##### RESTRICT (Preventing Parent Deletion)

- RESTRICT prevents the deletion or update of a parent record if any child records exist that reference it.

```sql
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE RESTRICT
);

-- If there are any orders related to a customer, the customer cannot be deleted.
```

### 7.2 Referential Integrity

- Referential Integrity ensures that the relationships between tables remain consistent, meaning that the foreign key values must always reference valid records in the parent table.

#### Ensuring Data Consistency Across Related Tables

- Foreign keys are used to ensure that there are no invalid references to non-existing records.

```sql
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
-- Orders must always refer to valid customers; no order can have an invalid `customer_id`.
```

#### Preventing Orphan Records

- Orphan records are rows in the child table that do not have a corresponding row in the parent table. Referential integrity ensures that these do not exist.

```sql
CREATE TABLE customers (
    name VARCHAR(100) PRIMARY KEY
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
-- This  will fail
```

### 7.3 Self-referencing Foreign Keys

- A self-referencing foreign key is a foreign key that references the same table. This is often used for hierarchical relationships, such as employee-manager relationships.

#### Recursive Relationships (Employee-Manager Hierarchies)

- A self-referencing foreign key is commonly used in hierarchical structures, like representing employees and their managers in an organization.

```sql
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);

-- In this case, an employee can have a manager who is also an employee in the same table.
-- The `manager_id` is a foreign key that references the `employee_id` in the same table.
```

#### Adjacency List Model

- The Adjacency List Model is one way to represent hierarchical data using self-referencing foreign keys. In this model, each record has a reference (foreign key) to its "parent" record, allowing the creation of tree-like structures.

```sql
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100),
    parent_category_id INT,
    FOREIGN KEY (parent_category_id) REFERENCES categories(category_id)
);

-- In this example, a category can have a parent category, allowing for hierarchical relationships (e.g., subcategories).
```

### **8. Indexes**

Indexes improve the speed of data retrieval operations in a database. Different types of indexes serve different use cases.

---

### 8.1 Clustered vs. Non-Clustered Indexes

#### Clustered Index (Physically Organizes Data)

- The table’s rows are stored in the order of the clustered index.
- There can be only one clustered index per table because the data is stored accordingly.
- generally the one set with primary key is the clustered indexed column

- Example (PostgreSQL & MySQL)

```sql
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(50)
);

-- The PRIMARY KEY automatically creates a clustered index on employee_id
```

- Effect: Data is physically arranged by `employee_id`, making range queries faster.

#### Non-Clustered Index (Separate Structure for Faster Lookups)

- The data is stored separately from the index.
- used for making partition indexing
- doesnt affect the ordering in the table
- There can be multiple non-clustered indexes on a table.

- Example (PostgreSQL & MySQL)

```sql
CREATE INDEX idx_employee_name ON employees(name);
```

- Effect: Speeds up searches based on `name`, but the data itself is not ordered by `name`.

### 8.2 B-Tree vs. Hash Indexes

#### B-Tree Index (Balanced Search Tree for Ordered Data)

- Default index type in most relational databases.
- Efficient for **range queries** and **sorting**.

- Example (PostgreSQL, MySQL, SQL Server)

```sql
CREATE INDEX idx_order_date ON orders(order_date);
```

- So, when you run: `CREATE INDEX idx_employee_name ON employees(name);`, You are creating a Non-Clustered B-Tree Index on the name column.

#### Hash Index (Fast Lookups, Good for Equality Searches)

- Designed for exact matches, not range queries.
- Hash indexes are mainly used in PostgreSQL and not available in MySQL by default.

- Example (PostgreSQL)

```sql
CREATE INDEX idx_customer_email_hash ON customers USING HASH (email);
```

- Effect: Faster lookups for queries like:

```sql
SELECT * FROM customers WHERE email = 'user@example.com';
```

### 8.3 Covering Indexes & Composite Indexes

#### Covering Index (Contains All Needed Columns for a Query)

- An index that includes all columns required by a query.
- Eliminates the need to fetch data from the table, boosting performance.

- **Example (PostgreSQL, MySQL)**

```sql
CREATE INDEX idx_order_summary ON orders(customer_id, order_date, total_amount);
```

- **Effect:** Optimizes queries like:

```sql
SELECT customer_id, order_date, total_amount FROM orders WHERE customer_id = 10;
```

#### Composite Index (Indexing Multiple Columns Together)

- An index that spans multiple columns.
- Efficient when filtering by multiple conditions.

- **Example (PostgreSQL, MySQL)**

```sql
CREATE INDEX idx_employee_department_name ON employees(department, name);
```

✔️ **Effect:** Optimized for queries like:

```sql
SELECT * FROM employees WHERE department = 'IT' AND name LIKE 'A%';
```

---

### 8.4 Index Maintenance & Performance Tuning\*

#### Index Fragmentation

- Over time, updates and deletions cause fragmentation, reducing performance.
- Fragmented indexes need rebuilding or reorganizing.

#### Rebuilding & Reorganizing Indexes

- Rebuilding creates a new index, while reorganizing defragments an existing one.

- Example (PostgreSQL)

```sql
REINDEX TABLE employees;
```

- \*Example (SQL Server)

```sql
ALTER INDEX idx_employee_name ON employees REBUILD;
```

- Effect: Improves query speed by optimizing the index structure.

### Summary

| Index Type              | Use Case                                                         |
| ----------------------- | ---------------------------------------------------------------- |
| **Clustered Index**     | Orders data physically (Primary Key).                            |
| **Non-Clustered Index** | Speeds up lookups but does not order data.                       |
| **B-Tree Index**        | Good for range queries and sorting.                              |
| **Hash Index**          | Fast for exact matches but not range queries.                    |
| **Covering Index**      | Includes all columns needed for a query, avoiding extra lookups. |
| **Composite Index**     | Optimized for filtering on multiple columns together.            |
| **Rebuilding Indexes**  | Prevents fragmentation and improves query performance.           |

### 3.2 Data Manipulation Language (DML)

DML is used for manipulating data in existing tables.

#### 1. INSERT – Add records to a table

```sql
-- Insert a single record into the employees table
INSERT INTO employees (name, department)
VALUES ('John Doe', 'Engineering');

-- Insert multiple records at once
INSERT INTO employees (name, department)
VALUES
    ('Jane Smith', 'Marketing'),
    ('Robert Brown', 'Sales');
```

#### 2. UPDATE – Modify existing records

```sql
-- Update a record in the employees table
UPDATE employees
SET department = 'HR'
WHERE employee_id = 1;

-- Update multiple records
UPDATE employees
SET department = 'IT'
WHERE department = 'Engineering';
```

#### 3. DELETE – Remove records from a table

```sql
-- Delete a single record
DELETE FROM employees
WHERE employee_id = 3;

-- Delete all records where the department is 'HR'
DELETE FROM employees
WHERE department = 'HR';
```

#### 4. SELECT – Retrieve data from tables

```sql
-- Select all data from the employees table
SELECT * FROM employees;

-- Select specific columns
SELECT name, department FROM employees WHERE employee_id = 1;
```

### 3.3 Data Query Language (DQL)

DQL is used to query or retrieve data from the database.

#### 1. WHERE – Filters query results

```sql
-- Select employees from the 'Sales' department
SELECT * FROM employees
WHERE department = 'Sales';
```

#### 2. GROUP BY – Aggregates data into groups

```sql
-- Group employees by department and count how many are in each department
SELECT department, COUNT(*) AS total_employees
FROM employees
GROUP BY department;
```

#### 3. ORDER BY – Sorts query results

```sql
-- Select employees and sort them by name in ascending order
SELECT * FROM employees
ORDER BY name ASC;

-- Sort employees by department in descending order
SELECT * FROM employees
ORDER BY department DESC;
```

#### 4. HAVING – Filters grouped results

```sql
-- Select departments that have more than 1 employee
SELECT department, COUNT(*) AS total_employees
FROM employees
GROUP BY department
HAVING COUNT(*) > 1;
```

---

### 3.4 Data Control Language (DCL)

DCL is used to control access to data in the database.

#### 1. GRANT – Provides user permissions

```sql
-- Grant SELECT permission to a user on the employees table
GRANT SELECT ON employees TO user_name;

-- Grant all permissions on the employees table to a user
GRANT ALL PRIVILEGES ON employees TO user_name;
```

#### 2. REVOKE – Removes user permissions

```sql
-- Revoke SELECT permission from a user on the employees table
REVOKE SELECT ON employees FROM user_name;

-- Revoke all privileges from a user on the employees table
REVOKE ALL PRIVILEGES ON employees FROM user_name;
```

### 3.5 Transaction Control Language (TCL)

TCL is used to manage the changes made by DML statements within a transaction.

#### 1. COMMIT – Saves changes permanently

```sql
-- After inserting data, commit the transaction to save the changes permanently
INSERT INTO employees (name, department)
VALUES ('Alice Green', 'Finance');

COMMIT; -- This makes the changes permanent.
```

#### 2. ROLLBACK – Reverts changes

```sql
-- If there is an error or you want to undo the transaction, use ROLLBACK
INSERT INTO employees (name, department)
VALUES ('Bob White', 'Marketing');

-- Oops! We realized we don’t want to save that change, so we roll back the transaction
ROLLBACK; -- This undoes the last changes made to the database.
```

#### 3. SAVEPOINT – Creates a checkpoint within a transaction

```sql
-- Create a savepoint before making changes
SAVEPOINT before_insert;

-- Insert data and then decide if you want to roll back to the savepoint
INSERT INTO employees (name, department)
VALUES ('Charlie Black', 'Engineering');

-- If something goes wrong later, you can roll back to the savepoint
ROLLBACK TO SAVEPOINT before_insert; -- Rolls back to before_insert
```

### Summary of Commands:

| Command | Description                          | Example                                   |
| ------- | ------------------------------------ | ----------------------------------------- |
| **DML** | Operations to modify or query data   | `INSERT`, `UPDATE`, `DELETE`, `SELECT`    |
| **DQL** | Querying data from the database      | `WHERE`, `GROUP BY`, `ORDER BY`, `HAVING` |
| **DCL** | Control access to data (permissions) | `GRANT`, `REVOKE`                         |
| **TCL** | Manage changes in transactions       | `COMMIT`, `ROLLBACK`, `SAVEPOINT`         |
