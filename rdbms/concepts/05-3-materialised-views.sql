-- Create an order_items table
CREATE TABLE IF NOT EXISTS order_items (
    order_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price NUMERIC(10, 2)
);

-- Insert sample data
INSERT INTO
    order_items (product_id, quantity, price)
VALUES
    (1, 10, 100.00),
    (2, 5, 50.00),
    (1, 3, 100.00),
    (3, 8, 75.00),
    (2, 7, 50.00);

--create materialised view
CREATE MATERIALIZED VIEW product_sales_summary AS
SELECT
    product_id,
    SUM(quantity) AS total_sales
FROM
    order_items
GROUP BY
    product_id;

--query materialised view
SELECT
    *
FROM
    product_sales_summary;

--insert more data and query befor and after refresh of materialised view
INSERT INTO
    order_items (product_id, quantity, price)
VALUES
    (1, 4, 100.00),
    (3, 2, 75.00);

SELECT
    *
FROM
    product_sales_summary;

REFRESH MATERIALIZED VIEW product_sales_summary;

SELECT
    *
FROM
    product_sales_summary;