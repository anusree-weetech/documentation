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

The changes will be reflected in the employees table since the view is directly tied to a single table.

🔹 Non-Updatable Views:
Non-updatable views are created using complex queries involving joins, aggregations, or subqueries.

- cannot be directly updated, but you can query them.

❌ Example: Non-Updatable View (Join & Aggregation)

```sql
CREATE VIEW sales_summary AS
SELECT o.order_id, o.customer_id, SUM(oi.quantity \* oi.price) AS total_price
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id, o.customer_id;
```

Attempting to update or insert directly into sales_summary will result in an error because of its complex nature. Instead, you'll have to update the underlying tables (orders and order_items).

### 3. ACID Properties

#### 1. Atomicity (All or Nothing)

- Example: Bank transfer between two accounts.

```sql
BEGIN;  -- Start transaction
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
COMMIT;  -- Ensure both changes are applied together
```

- If any update fails (e.g., insufficient funds), the transaction rolls back, ensuring no partial updates.

#### 2. Consistency (Valid State)

- Example: Ensure no account balance goes negative.

```sql
ALTER TABLE accounts ADD CONSTRAINT balance_check CHECK (balance >= 0);
```

- Now, if someone tries to withdraw more than the available balance, PostgreSQL rejects the transaction, keeping the data valid.

#### 3. Isolation (No Interference)

- Example: Two customers trying to book the same movie ticket.

```sql
BEGIN;
SELECT * FROM tickets WHERE ticket_id = 1 FOR UPDATE;  -- Locks the ticket row
UPDATE tickets SET status = 'BOOKED' WHERE ticket_id = 1;
COMMIT;
```

- If another transaction tries to book the same ticket simultaneously, it must wait until the first one finishes, preventing conflicts.

#### 4. Durability (Permanent Changes)

- Example: Ensure an order is recorded even after a crash.

```sql
BEGIN;
INSERT INTO orders (customer_id, product_id, amount) VALUES (1, 101, 50);
COMMIT;
```

- Even if the server crashes right after `COMMIT;`, the order remains saved in the database, thanks to PostgreSQL’s WAL (Write-Ahead Logging).

### 4. Keys and Relationships

#### 1. Primary Key (PK) – Unique Identifier

- Example: id uniquely identifies each user in the users table.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);
```

- Each id is unique and cannot be NULL.

#### 2. Foreign Key (FK) – Relationship Between Tables

- Example: The orders table references the users table.

```sql
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),  -- FK linking to users table
    total_amount DECIMAL(10,2) NOT NULL
);
```

- Each order belongs to a valid user_id from the users table.

#### 3. Composite Key – Multiple Columns as Primary Key

- Example: A student_courses table where a student can enroll in multiple courses.

```sql
CREATE TABLE student_courses (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id)  -- Composite PK
);
```

- Prevents duplicate (student_id, course_id) pairs but allows a student to enroll in multiple courses.

#### 4. Candidate Key – Potential Primary Keys

- Example: In the employees table, both employee_id and ssn are unique.

```sql
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,  -- Chosen as the PK
    ssn TEXT UNIQUE NOT NULL  -- Candidate key (could also be a PK)
);
```

- Both employee_id and ssn are unique, but we choose employee_id as the primary key.
- If needed, a Candidate Key can be promoted to be the new Primary Key if business rules change

### 5. SQL (Structured Query Language)

#### 1. DDL (Data Definition Language) – Defines Database Structure

- Example: Creating, altering, and dropping a table.

```SQL
-- CREATE a table
CREATE TABLE employees (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
salary DECIMAL(10,2)
);

-- ALTER a table (adding a column)
ALTER TABLE employees ADD COLUMN department TEXT;

-- DROP a table (removing it completely)
DROP TABLE employees;
```

- DDL statements modify the database structure.

#### 2. DML (Data Manipulation Language) – Modify Data

- Example: Inserting, updating, and deleting records.

```sql
-- INSERT a new employee
INSERT INTO employees (name, salary, department) VALUES ('Alice', 50000, 'HR');

-- UPDATE an employee's salary
UPDATE employees SET salary = 55000 WHERE name = 'Alice';

-- DELETE an employee
DELETE FROM employees WHERE name = 'Alice';
```

- DML is used to manipulate data inside tables.

#### 3. DQL (Data Query Language) – Retrieve Data

- Example: Selecting data from a table.

```sql
-- SELECT all employees
SELECT \* FROM employees;

-- SELECT specific columns with a condition
SELECT name, salary FROM employees WHERE department = 'HR';
```

- DQL helps fetch data from the database.

#### 4. DCL (Data Control Language) – Manage Permissions

- Example: Granting and revoking access.

```sql
-- GRANT permission to a user
GRANT SELECT, INSERT ON employees TO user1;

-- REVOKE permission from a user
REVOKE INSERT ON employees FROM user1;
```

- DCL is used to control access to database objects.

#### 5. TCL (Transaction Control Language) – Manage Transactions

- Example: Controlling transactions in a banking system.

```sql
-- BEGIN a transaction
BEGIN;

-- Deduct from one account
UPDATE accounts SET balance = balance - 100 WHERE id = 1;

-- Add to another account
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- COMMIT transaction (save changes)
COMMIT;

-- ROLLBACK transaction (undo changes if something goes wrong)
ROLLBACK;

-- SAVEPOINT (partial rollback)
SAVEPOINT before_update;
UPDATE employees SET salary = 60000 WHERE id = 1;
ROLLBACK TO before_update; -- Undo only the last update
```

- TCL ensures data integrity in multi-step transactions.

### 6. Indexing

#### 1. Primary Index – Automatically Created for Primary Key

- Example: When defining a PRIMARY KEY, PostgreSQL automatically creates an index.

```sql
CREATE TABLE employees (
id SERIAL PRIMARY KEY, -- Primary Index created automatically
name TEXT NOT NULL,
salary DECIMAL(10,2)
);
```

- The index improves searches on id, ensuring fast lookups.

#### 2. Secondary Index – Manually Created for Frequent Queries

- Example: Creating an index on name to speed up searches.

````sql
CREATE INDEX idx_employee_name ON employees(name);
```sql
-- Fast lookup using the index
SELECT \* FROM employees WHERE name = 'Alice';
-  This index improves search performance on name.
````

#### 3. Clustered Index – Physically Reorders Data (Simulated in PostgreSQL)

- Example: PostgreSQL does not support clustered indexes directly, but you can simulate them using CLUSTER.

```sql
-- Create an index
CREATE INDEX idx_employee_salary ON employees(salary);

-- Cluster the table based on this index
CLUSTER employees USING idx_employee_salary;
```

- This reorganizes the table physically according to salary, improving range queries.

#### 4. Non-Clustered Index – Logical Ordering Without Reordering Data

- Example: Creating an index on salary without changing row order.

```sql
CREATE INDEX idx_salary ON employees(salary);
-  This index speeds up salary-based lookups but does not change the physical order of rows.
```

### 7. Stored Procedures and Triggers

#### 1. Stored Procedure – Precompiled SQL for Reusability

- Example: A stored procedure to give a salary raise to an employee.

```sql
CREATE OR REPLACE PROCEDURE give_salary_raise(emp_id INT, raise_amount DECIMAL)
LANGUAGE plpgsql
AS $$
BEGIN
UPDATE employees SET salary = salary + raise_amount WHERE id = emp_id;
END;

$$
;
```

- Execute the stored procedure:

```sql
CALL give_salary_raise(1, 5000);
```

- This procedure updates an employee’s salary without writing the UPDATE statement every time.

#### 2. Trigger – Automatic Execution on an Event

- Example: A trigger that logs salary changes in an audit table.

```sql
-- Create an audit table to store salary change history
CREATE TABLE salary_audit (
    audit_id SERIAL PRIMARY KEY,
    emp_id INT,
    old_salary DECIMAL(10,2),
    new_salary DECIMAL(10,2),
    changed_at TIMESTAMP DEFAULT NOW()
);

-- Create a trigger function to log salary changes
CREATE OR REPLACE FUNCTION log_salary_changes()
RETURNS TRIGGER AS
$$

BEGIN
INSERT INTO salary_audit (emp_id, old_salary, new_salary)
VALUES (OLD.id, OLD.salary, NEW.salary);
RETURN NEW;
END;

$$
LANGUAGE plpgsql;

-- Create the trigger to fire on salary updates
CREATE TRIGGER salary_update_trigger
AFTER UPDATE OF salary ON employees
FOR EACH ROW
EXECUTE FUNCTION log_salary_changes();
```

- When an employee's salary is updated, the trigger logs the old and new salary automatically:

```sql
UPDATE employees SET salary = 60000 WHERE id = 1;
-  The trigger ensures salary changes are always tracked without manual logging.
$$
```
