-- Step 1: Create the customers table
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Step 2: Create the orders table with a foreign key referencing customers
DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT,
    order_date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- Step 3: Insert sample customers
INSERT INTO
    customers (name)
VALUES
    ('Alice'),
    ('Bob');

-- Step 4: Insert sample orders linked to customers
INSERT INTO
    orders (customer_id)
VALUES
    (1),
    (2),
    (1);

-- Step 5: Check data before deletion
SELECT
    *
FROM
    customers;

SELECT
    *
FROM
    orders;

-- Step 6: Delete a customer and check if orders are also deleted
DELETE FROM
    customers
WHERE
    customer_id = 1;

-- Step 7: Check data after deletion
SELECT
    *
FROM
    customers;

SELECT
    *
FROM
    orders;