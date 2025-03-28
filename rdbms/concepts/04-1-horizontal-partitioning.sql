--unpartitioned table
CREATE TABLE IF NOT EXISTS orders1(
    order_id SERIAL PRIMARY KEY,
    order_date DATE NOT NULL,
    customer_name TEXT NOT NULL,
    amount NUMERIC NOT NULL
);

-- Insert 1 million random rows for testing
INSERT INTO
    orders1 (order_date, customer_name, amount)
SELECT
    '2023-01-01' :: DATE + (random() * 730) :: INTEGER,
    -- Random date within 2 years
    'Customer ' || (random() * 1000) :: INTEGER,
    random() * 1000
FROM
    generate_series(1, 1000000);

--  Rows Removed by Filter: 319202
--  Planning Time: 0.132 ms
--  Execution Time: 49.715 ms
--query and check time for unpartitioned
EXPLAIN ANALYZE
SELECT
    *
FROM
    orders1
WHERE
    order_date BETWEEN '2024-01-01'
    AND '2024-01-31';

--partitoined  table
CREATE TABLE IF NOT EXISTS orders2(
    order_id SERIAL,
    order_date DATE NOT NULL,
    customer_name TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    PRIMARY KEY (order_id, order_date)
) PARTITION by RANGE(order_date);

-- Create partitions for each year
CREATE TABLE orders_2023 PARTITION of orders2 FOR
VALUES
FROM
    ('2023-01-01') TO ('2023-12-31');

CREATE TABLE orders_2024 PARTITION od orders2 FOR
VALUES
FROM
    ('2024-01-01') TO ('2024-12-01');

--query and check time for partitioned
EXPLAIN ANALYZE
SELECT
    *
FROM
    orders2
WHERE
    order_date BETWEEN '2024-01-01'
    AND '2024-01-31';

--  Planning Time: 0.108 ms
--  Execution Time: 0.010 ms