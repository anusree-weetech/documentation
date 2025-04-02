--create table
DROP TABLE IF EXISTS orders;

DROP TABLE IF EXISTS order_items;

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL
);

CREATE TABLE order_items (
    item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price NUMERIC(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

--insert sample data
INSERT INTO
    orders (customer_id, order_date)
VALUES
    (101, '2024-03-01'),
    (102, '2024-03-02'),
    (103, '2024-03-03');

INSERT INTO
    order_items (order_id, product_id, quantity, price)
VALUES
    (1, 1, 2, 100.00),
    (1, 2, 1, 50.00),
    (2, 1, 1, 100.00),
    (2, 3, 3, 75.00),
    (3, 2, 2, 50.00);

--create non-updatable view
CREATE VIEW sales_summary AS
SELECT
    o.order_id,
    o.customer_id,
    SUM(oi.quantity * oi.price) AS total_price
FROM
    orders o
    JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY
    o.order_id,
    o.customer_id;

--query the view
SELECT
    *
FROM
    sales_summary;

--attempt to update view
UPDATE
    sales_summary
SET
    total_price = 500
WHERE
    order_id = 1;
