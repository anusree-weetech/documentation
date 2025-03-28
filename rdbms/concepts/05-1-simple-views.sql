--create table
CREATE TABLE IF NOT EXISTS employees (
    employee_id numeric PRIMARY KEY,
    name text,
    department text,
    experience numeric
);

INSERT INTO
    employees (employee_id, name, department, experience)
VALUES
    (1, 'Alan', 'IT', 4),
    (2, 'Bob', 'HR', 2),
    (3, 'Catherine', 'IT', 8);

--create and apply views
CREATE VIEW employee_view AS
SELECT
    employee_id,
    name,
    department
FROM
    employees;

SELECT
    *
FROM
    employee_view;