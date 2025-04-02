--create table
DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    department TEXT NOT NULL
);

--insert sample data
INSERT INTO
    employees (name, department)
VALUES
    ('Alice', 'IT'),
    ('Bob', 'HR'),
    ('Charlie', 'Finance');

--create updatable view
CREATE VIEW employee_view AS
SELECT
    employee_id,
    name,
    department
FROM
    employees;

--perform updation
UPDATE
    employee_view
SET
    department = 'Marketing'
WHERE
    employee_id = 1;

--view updated results
SELECT * FROM employees;
