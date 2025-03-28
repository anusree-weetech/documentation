CREATE TABLE IF NOT EXISTS products (
    product_id serial PRIMARY KEY,
    name text NOT NULL,
    price numeric NOT NULL,
    version integer NOT NULL DEFAULT 1 --version column fo roptimitic locking 
);

--insert sample data
INSERT INTO
    products (name, price, version)
VALUES
    ('Laptop', 1000, 1);

--simulate user 1 and user 2 reading the same data
SELECT
    *
FROM
    products
WHERE
    product_id = 1;

SELECT
    *
FROM
    products
WHERE
    product_id = 1;

--run this on terminal 1
UPDATE
    products
SET
    price = 1200,
    version = version + 1
WHERE
    product_id = 1
    AND version = 1;


--run this alone on terminal 2
UPDATE
    products
SET
    price = 1200,
    version = version + 1
WHERE
    product_id = 1
    AND version = 1;

--check final data
SELECT
    *
FROM
    products
WHERE
    product_id = 1

--will show update 0 when update fails because of optimistic locking