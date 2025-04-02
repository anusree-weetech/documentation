--create table
DROP TABLE IF EXISTS employees CASCADE;

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

--non-repeatable reads
SET
    TRANSACTION ISOLATION LEVEL READ COMMITTED;

BEGIN;

SELECT
    salary
FROM
    employees
WHERE
    employee_id = 1;

--modify the same row in another terminal
BEGIN;

UPDATE
    employees
SET
    salary = 5500
WHERE
    employee_id = 1;

COMMIT;

--second reading within terminal 1 itsef
SELECT
    salary
FROM
    employees
WHERE
    employee_id = 1;

-- Now the salary is 5500 (different from first read in the same transaction)
COMMIT;

--x--
--using repeatable read to prevent it
-- Session 1: Start transaction with REPEATABLE READ
BEGIN;

SET
    TRANSACTION ISOLATION LEVEL REPEATABLE READ;

SELECT
    salary
FROM
    employees
WHERE
    employee_id = 1;

-- Returns: 500
-- Meanwhile, Session 2: Tries to update balance
UPDATE
    employees
SET
    salary = 700
WHERE
    employee_id = 1;

-- BLOCKED! Session 1 still holds its snapshot of data.
-- Back to Session 1: Read again
SELECT
    salary
FROM
    employees
WHERE
    employee_id = 1;

-- Still returns: 500 (No change)
-- Commit and release the lock
COMMIT;