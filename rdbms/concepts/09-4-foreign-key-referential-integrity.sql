DROP TABLE IF EXISTS customers CASCADE;

CREATE TABLE customers (name VARCHAR(100) PRIMARY KEY);

DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

--ERROR:  column "customer_id" referenced in foreign key constraint does not exist

