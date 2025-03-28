CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT,
    order_date DATE
);

INSERT INTO
    orders (customer_id, order_date)
VALUES
    (1, '2024-01-01'),
    (2, '2024-02-15'),
    (3, '2024-03-10');

CREATE TABLE IF NOT EXISTS order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT,
    quantity INT,
    price NUMERIC(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

INSERT INTO
    order_items (order_id, quantity, price)
VALUES
    (1, 2, 50.00),
    -- Order 1, 2 items at $50 each
    (1, 1, 30.00),
    -- Order 1, 1 item at $30
    (2, 3, 20.00),
    -- Order 2, 3 items at $20 each
    (3, 5, 15.00);

-- Order 3, 5 items at $15 each
CREATE VIEW sales_summary AS
SELECT
    o.order_id,
    o.customer_id,
    sum(oi.quantity * oi.price) AS total_price
FROM
    orders o
    JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY
    o.order_id,
    o.customer_id;

SELECT
    *
FROM
    sales_summary;