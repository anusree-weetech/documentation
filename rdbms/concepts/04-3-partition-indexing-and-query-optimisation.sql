-- without partition indexing
-- start with a horizontally partitioned table
CREATE TABLE orders (
    order_id SERIAL,
    order_date DATE NOT NULL,
    customer_id INT NOT NULL,
    amount NUMERIC(10, 2),
    PRIMARY KEY (order_id, order_date)
) PARTITION by RANGE(order_date);

CREATE TABLE orders_2023 PARTITION OF orders FOR
VALUES
FROM
    ('2023-01-01') TO ('2024-01-01');

CREATE TABLE orders_2024 PARTITION OF orders FOR
VALUES
FROM
    ('2024-01-01') TO ('2025-01-01');

INSERT INTO
    orders (order_date, customer_id, amount)
SELECT
    -- Random date between 2023-01-01 and 2024-12-31
    '2023-01-01' :: DATE + (random() * (730)) :: INTEGER,
    -- 730 days in 2 years (2023-2024)
    (random() * 100 + 1) :: int AS customer_id,
    (random() * 990 + 10) :: numeric(10, 2) AS amount
FROM
    generate_series(1, 1000000);

--  Planning Time: 0.211 ms
--  Execution Time: 0.101 ms
EXPLAIN ANALYZE
SELECT
    *
FROM
    orders
WHERE
    order_id = 999997;

-- with partition indexing
CREATE INDEX idx_orders_2024 ON orders_2024 (order_id);

EXPLAIN ANALYZE
SELECT
    *
FROM
    orders
WHERE
    order_id = 999997;

--  Planning Time: 0.246 ms
--  Execution Time: 0.081 ms