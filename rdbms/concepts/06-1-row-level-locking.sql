-- Create the employees table
DROP TABLE IF EXISTS employees CASCADE;

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    salary NUMERIC(10, 2) NOT NULL
);

-- Insert sample data
INSERT INTO
    employees (name, salary)
VALUES
    ('Alice', 5000),
    ('Bob', 5500),
    ('Charlie', 6000);

-- Transaction 1: Acquire Row Lock
BEGIN;

SELECT
    *
FROM
    employees
WHERE
    employee_id = 1 FOR
UPDATE
;

-- Locks only this row
UPDATE
    employees
SET
    salary = salary + 500
WHERE
    employee_id = 1;

COMMIT;

-- Transaction 2 (Run in a different session to test row-level locking)
BEGIN;

SELECT
    *
FROM
    employees
WHERE
    employee_id = 1 FOR
UPDATE
;

-- This will wait if Transaction 1 is active
UPDATE
    employees
SET
    salary = salary + 500
WHERE
    employee_id = 1;

COMMIT;