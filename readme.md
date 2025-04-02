# Todo

## Table of contents

- [ ] [rdbms concepts](#rdbms-concepts)
- [ ] [orm concepts](#orm-concepts)
- [ ] [squelize(orm) concepts]()
  - [ ] [squelize-express app]()
  - [ ] [squelize-nest app]()
- [ ] [typeorm(orm) concepts]()
  - [ ] [typeorm-express app]()
  - [ ] [typeorm-nest app]()
- [ ] [prisma(orm) concepts]()
  - [ ] [prisma-express app]()
  - [ ] [prisma-nest app]()
- [ ] non rdbms concepts
- [ ] sqlite concepts
  - [ ] sqlite-express local app
  - [ ] sqlite-nest local app
  - [ ] sqlite-express cloud app
  - [ ] sqlite-nest cloud app
- [ ] mysql concepts
  - [ ] mysql-express local app
  - [ ] mysql-nest local app
  - [ ] mysql-express cloud app
  - [ ] mysql-nest cloud app
- [ ] postgres concepts
  - [ ] postgres-express local app
  - [ ] postgres-nest local app
  - [ ] postgres-express cloud app
  - [ ] postgres-nest cloud app
- [ ] graphql concepts
- [ ] firebase concepts
- [ ] doker and kunernetes concepts
  - [ ] docker and kubernetes app


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

## orm concepts

When discussing RDBMS (Relational Database Management Systems) and ORM (Object-Relational Mapping), there are several key concepts to understand. Below is a list of the fundamental concepts:

RDBMS Concepts:
Tables:

A collection of related data organized in rows and columns.

Each table typically represents an entity in the real world (e.g., users, products).

Rows (Records):

Each row in a table represents a unique instance of the entity, with values for each column.

Columns:

Each column in a table defines a specific attribute of the entity (e.g., name, email for a users table).

Primary Key:

A unique identifier for each row in a table. This key ensures that no two rows are identical.

Foreign Key:

A column or set of columns in one table that uniquely identifies a row of another table. It establishes relationships between tables.

Normalization:

The process of organizing data to reduce redundancy and dependency, typically into smaller, related tables.

Relationships:

One-to-One: One record in a table is associated with one record in another table.

One-to-Many: One record in a table is associated with multiple records in another table.

Many-to-Many: Many records in one table are associated with many records in another table, often facilitated by a junction table.

Indexes:

A performance-enhancing structure that helps speed up data retrieval operations, often based on columns that are frequently queried.

SQL (Structured Query Language):

A language used to manage and manipulate relational databases. It is used for querying, inserting, updating, and deleting data from RDBMS.

ACID Properties:

Atomicity: Ensures that all operations within a transaction are completed successfully.

Consistency: Ensures that the database remains in a valid state before and after a transaction.

Isolation: Ensures that the operations of a transaction are isolated from others.

Durability: Ensures that once a transaction is committed, it remains persistent, even in the case of system failures.

ORM (Object-Relational Mapping) Concepts:
Object-Relational Mapping:

A technique that allows developers to work with databases using object-oriented programming (OOP) principles, effectively mapping database tables to objects in the programming language.

Entities (Models):

In ORM, an entity (or model) represents a table in the database, and each instance of an entity corresponds to a row in that table.

Attributes:

The properties of an entity class that map to the columns in the table.

Session:

A component that manages the interaction between the application and the database. It tracks changes to entities and handles operations like inserts, updates, and deletes.

Query Builder:

A tool that helps construct SQL queries programmatically. ORM libraries typically offer a query builder to ease the creation of dynamic queries.

Lazy Loading:

A design pattern where related data (e.g., foreign key relationships) is only fetched when it is accessed, rather than being loaded immediately when the parent object is loaded.

Eager Loading:

A pattern where related data is loaded immediately along with the parent object, often used to avoid multiple database queries.

Mappings (Schema Mapping):

Defines the relationship between an object and a database table, including how columns map to object attributes.

CRUD Operations:

Create: Insert a new record into the database.

Read: Retrieve records from the database.

Update: Modify an existing record.

Delete: Remove a record.

Transactions:

ORM frameworks often handle transactions, allowing for batch operations that ensure consistency and rollback in case of errors.

Inheritance Mapping:

In ORM, inheritance in object-oriented programming needs to be mapped to the relational model. There are several strategies, such as:

Single Table Inheritance: All classes in the hierarchy are stored in one table.

Class Table Inheritance: Each class in the hierarchy has its own table.

Concrete Table Inheritance: Each subclass is stored in its own table.

Schema Generation:

Automatically creating or updating the database schema (tables, constraints, etc.) based on the structure of the ORM classes.

Association:

Describes relationships between objects in the ORM. Examples include:

One-to-One: One entity is associated with another entity.

One-to-Many: One entity is associated with multiple entities.

Many-to-Many: Multiple entities are associated with multiple other entities.

Mapping Configurations:

Configuring ORM behavior, such as column names, data types, constraints, relationships, and how objects should be mapped to tables.

Database Schema:

ORM tools may automatically synchronize the object model with the database schema, ensuring that table definitions reflect changes in the object model.

Key ORM Tools/Frameworks:
Hibernate (Java)

Entity Framework (C#/.NET)

Django ORM (Python)

SQLAlchemy (Python)

ActiveRecord (Ruby on Rails)

Doctrine ORM (PHP)

Advanced ORM Concepts:
Advanced Querying:

Complex Queries: Writing advanced queries using ORM methods, such as joins, subqueries, group by, and having clauses.

Custom Queries: Executing raw SQL queries or stored procedures when ORM features fall short of the required performance or complexity.

Aggregation and Grouping: Using ORM to perform aggregate functions like COUNT(), SUM(), AVG(), etc., and grouping results.

Transactions & Nested Transactions:

Nested Transactions: Handling complex transactional workflows where multiple sub-transactions are rolled back or committed independently.

Savepoints: Marking points within a transaction to allow partial rollbacks without rolling back the entire transaction.

Caching:

First-Level Cache: ORM typically provides a session-level cache that stores objects within the scope of a session. This avoids unnecessary database queries when an object is accessed repeatedly.

Second-Level Cache: A cache that operates across multiple sessions. This is shared among different sessions to reduce the number of database hits for frequently accessed data.

Query Caching: Caching the results of specific queries to avoid running the same expensive queries multiple times.

Lazy Loading vs. Eager Loading:

Lazy Loading: Automatically loading related entities when they are accessed. This can lead to multiple database queries if the related data is accessed frequently.

Eager Loading: Automatically loading related entities along with the main entity in one query, which may reduce the number of database hits but increase the complexity of the query.

Explicit Loading: Manually triggering the loading of related entities when necessary, providing more control over performance.

N+1 Query Problem:

Definition: Occurs when an ORM loads a collection of entities (e.g., 10 items) and then makes one query for each related entity. This results in excessive queries and a performance hit.

Solution: Use strategies like eager loading or join fetch to reduce unnecessary queries.

Optimistic vs. Pessimistic Locking:

Optimistic Locking: A strategy that assumes multiple transactions can complete without interfering with each other. It uses a versioning mechanism to detect if a record has been updated by another transaction.

Pessimistic Locking: A strategy where transactions lock the data they are working with, preventing other transactions from modifying it until the lock is released. It is typically used for scenarios that require absolute consistency at the cost of performance.

Advanced Inheritance Mapping:

Single Table Inheritance (STI): Storing all classes in an inheritance hierarchy in a single database table, often resulting in a table with many nullable columns (denormalized).

Class Table Inheritance (CTI): Each class in the hierarchy has its own table, and subclasses are joined via foreign keys when queried.

Concrete Table Inheritance (CTI): Each subclass has its own table with all fields, including those inherited from the parent class, leading to some duplication of data.

Composite Primary Keys:

Definition: Using multiple columns together as a primary key instead of a single column.

Example: In some relational databases, a composite primary key is necessary when no single column can uniquely identify a record (e.g., order_id + product_id for order details).

ORM Handling: Complex handling of composite keys requires ORM support for properly mapping the keys and managing the database relationships.

Many-to-Many Relationships:

Junction Tables: Handling many-to-many relationships involves creating a junction table to link two entities. ORM frameworks can automatically manage these relationships.

Bidirectional Relationships: Managing relationships where both sides (e.g., Order and Product) have references to each other, often requiring careful handling of cascading operations.

Cascade Operations:

Cascade Types: Specifying how related objects should be saved, deleted, or updated when the parent entity is modified. Cascade operations include:

Cascade All: Automatically performing all CRUD operations on related entities.

Cascade Persist: Automatically persisting (inserting) related entities.

Cascade Remove: Automatically removing related entities when the parent entity is deleted.

Cascade On Save/Update/Delete: Optimizing how changes propagate across the object graph (e.g., when an object is updated, should related objects be updated as well?).

Soft Deletes:

Soft Deletion: Rather than physically removing a record, a flag is set (e.g., is_deleted = true) to indicate that the record has been deleted.

ORM Handling: Implementing soft delete patterns where ORM libraries automatically exclude "deleted" records from results.

Schema Evolution/Versioning:

Database Migration: Managing changes in the database schema (adding/removing columns, tables, constraints, etc.) and applying migrations to update the database schema without data loss.

Automatic Schema Sync: ORM tools can sometimes automatically synchronize the database schema with the object model, though this is typically avoided in production for safety reasons.

Batch Processing:

Batch Inserts/Updates: In large datasets, ORM frameworks can optimize by grouping multiple insert or update operations into a single database transaction, reducing the overhead of individual operations.

Batch Fetching: Fetching related entities in batches to minimize the overhead caused by lazy loading multiple times.

Query Performance Optimization:

Fetching Strategy: Choosing between eager and lazy loading based on use case and performance needs.

Indexing: ORM systems may allow configuration of indexes on certain columns to optimize query performance.

Query Optimization: Tuning queries for better performance, including using JOINs, GROUP BY, and HAVING in ORM-based queries.

Event Listeners and Callbacks:

Lifecycle Events: ORM frameworks often provide hooks or event listeners for certain lifecycle events such as beforeInsert, afterUpdate, beforeDelete, etc. These are useful for validating or manipulating data before or after it is persisted.

Custom Callbacks: Developers can define custom callbacks that are triggered by ORM events to extend functionality or add complex logic to the persistence layer.

Multi-Tenant Support:

Tenant Isolation: Handling scenarios where a single database is shared by multiple tenants (customers). Each tenant’s data must be isolated to ensure privacy and security.

Sharding: Distributing data across multiple databases based on certain criteria (e.g., tenant ID) to scale the application.

Database-Driven Validation:

Constraints: Leveraging database-level constraints (e.g., unique, foreign key) alongside application-level validation.

Triggers and Stored Procedures: Using database triggers and stored procedures to enforce complex business rules or validations that are difficult to handle in the application code.

Advanced Relationships:

Self-Referencing: When an entity has a relationship to itself, such as an employee reporting to another employee (recursive relationships).

Polymorphic Associations: ORM frameworks can support relationships where a model can be associated with more than one other model type (e.g., a comment can belong to both a Post and a Video).

Custom Mapping and Type Converters:

Custom Mappings: Customizing how certain data types are mapped from the database to the application model (e.g., mapping a JSON column to a list).

Type Converters: Using type converters to handle non-standard types (e.g., converting a custom object to a string before saving it to the database).
