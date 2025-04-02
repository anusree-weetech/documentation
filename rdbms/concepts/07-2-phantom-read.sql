--create table
DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    salary NUMERIC(10, 2) NOT NULL
);

--insert values
INSERT INTO
    employees (name, salary)
VALUES
    ('Alice', 5000),
    ('Bob', 6000),
    ('Charlie', 7000);

--repeatable reads/phantom reads
SET
    TRANSACTION ISOLATION LEVEL REPEATABLE READ;

BEGIN;

SELECT
    COUNT(*)
FROM
    employees;

--insert another row in terminal 2
BEGIN;

INSERT INTO
    employees (name, salary)
VALUES
    ('New Employee', 6000);

COMMIT;

--second reading in terminal 1
SELECT
    COUNT(*)
FROM
    employees;

-- Now count = 6 (different from first read in the same transaction)
COMMIT;

--x--
--solve it using serializable read
-- Session 1: Start transaction with SERIALIZABLE
BEGIN;

SET
    TRANSACTION ISOLATION LEVEL SERIALIZABLE;

SELECT
    COUNT(*)
FROM
    employees;

-- Returns: 5
-- Meanwhile, Session 2: Tries to insert a new row
INSERT INTO
    employees (name, salary)
VALUES
    ('Beena', 8000);

-- BLOCKED! Session 1 is preventing phantom reads.
-- Back to Session 1: Read again
SELECT
    COUNT(*)
FROM
    employees;

-- Still returns: 5 (Phantom row prevented)
-- Commit and release lock
COMMIT;