# Todo 

## Table of contents
- [] [rdbms concepts](#rdbms-concepts)
- []  sqlite concepts 
- []  sqlite local app
- []  sqlite cloud app

## rdbms concepts
1. Core Concepts
Database – A structured collection of data.

Table – A collection of rows (records) and columns (fields).

Row (Record, Tuple) – A single entry in a table.

Column (Field, Attribute) – A specific type of data stored in a table.

Schema – The structure of a database, including tables, relationships, and constraints.

Primary Key (PK) – A unique identifier for a row in a table.

Foreign Key (FK) – A reference to a primary key in another table, creating relationships.

Indexes – Structures that improve query performance.

2. Database Design
Normalization – Organizing data to reduce redundancy and improve integrity (1NF, 2NF, 3NF, BCNF, 4NF, 5NF).

Denormalization – Combining tables to improve query performance.

Entity-Relationship (ER) Model – A diagram representing tables, attributes, and relationships.

One-to-One (1:1) Relationship – Each row in Table A links to one row in Table B.

One-to-Many (1:M) Relationship – One row in Table A links to multiple rows in Table B.

Many-to-Many (M:M) Relationship – Multiple rows in Table A link to multiple rows in Table B (usually via a junction table).

3. SQL (Structured Query Language)
3.1 Data Definition Language (DDL)
CREATE – Create databases, tables, and indexes.

ALTER – Modify existing database structures.

DROP – Delete databases, tables, or columns.

TRUNCATE – Remove all records from a table without logging.

3.2 Data Manipulation Language (DML)
INSERT – Add records to a table.

UPDATE – Modify existing records.

DELETE – Remove records from a table.

SELECT – Retrieve data from tables.

3.3 Data Query Language (DQL)
WHERE – Filters query results.

GROUP BY – Aggregates data into groups.

ORDER BY – Sorts query results.

HAVING – Filters grouped results.

3.4 Data Control Language (DCL)
GRANT – Provides user permissions.

REVOKE – Removes user permissions.

3.5 Transaction Control Language (TCL)
COMMIT – Saves changes permanently.

ROLLBACK – Reverts changes.

SAVEPOINT – Creates a checkpoint within a transaction.

4. Constraints
NOT NULL – Ensures a column cannot be NULL.

UNIQUE – Ensures all values in a column are unique.

PRIMARY KEY – A combination of NOT NULL and UNIQUE.

FOREIGN KEY – Ensures referential integrity between tables.

CHECK – Ensures column values meet a condition.

DEFAULT – Assigns a default value if no value is provided.

5. Indexing & Optimization
Clustered Index – Determines the physical order of data in a table.

Non-Clustered Index – A separate structure for faster lookups.

Full-Text Indexing – Optimizes searching text fields.

Query Optimization – Techniques like indexing, query caching, and materialized views.

Execution Plan – SQL optimizer-generated plan for query execution.

6. Transactions & ACID Properties
Atomicity – Ensures a transaction is all or nothing.

Consistency – Ensures data integrity before and after a transaction.

Isolation – Prevents transactions from interfering with each other.

Durability – Ensures committed transactions are saved permanently.

7. Concurrency Control & Locking
Locks – Mechanism to manage simultaneous access (Shared, Exclusive, Row, Table, Deadlocks).

Optimistic Locking – Assumes minimal conflicts; retries if conflicts occur.

Pessimistic Locking – Prevents conflicts by locking data.

Isolation Levels –

Read Uncommitted

Read Committed

Repeatable Read

Serializable

8. Backup & Recovery
Full Backup – Copies the entire database.

Incremental Backup – Backs up only changed data since the last backup.

Point-in-Time Recovery – Restores data to a specific moment.

Log-Based Recovery – Uses transaction logs to restore data.

9. Security & Access Control
User Roles & Permissions – Restricting database access.

Encryption – Encrypting data at rest and in transit.

SQL Injection Prevention – Using parameterized queries.

Audit Logs – Tracking changes and access.

10. RDBMS Implementations
MySQL – Open-source, widely used for web applications.

PostgreSQL – Advanced, with support for complex queries and JSON.

Oracle Database – Enterprise-grade with extensive security features.

Microsoft SQL Server – Popular for enterprise applications.

MariaDB – Fork of MySQL with performance improvements.

11. Advanced Topics
Sharding – Splitting large databases into smaller, manageable parts.

Replication – Copying data across multiple databases for redundancy.

Materialized Views – Precomputed query results stored for quick access.

Stored Procedures – Predefined SQL scripts for execution.

Triggers – Automated actions based on events.

JSON & XML Support – Storing semi-structured data in relational databases.

