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

--table lock
BEGIN;

-- Locks entire table
-- This prevents other sessions from inserting, updating, or deleting rows.
-- The lock is held until the transaction is committed or rolled back.
LOCK TABLE employees IN EXCLUSIVE MODE;

SELECT
    *
FROM
    employees;

--try modifying table in another terminal
UPDATE
    employees
SET
    salary = salary + 500
WHERE
    employee_id = 1;

COMMIT;

-- Now other transactions can modify the table