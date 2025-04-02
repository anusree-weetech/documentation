-- Create the sales table with a virtual computed column
DROP TABLE IF EXISTS sales;

CREATE TABLE sales (
    sale_id INT AUTO_INCREMENT PRIMARY KEY,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    tota_price decimal(10, 2) generated always AS (price * quantity) virtual
);

-- Insert some test data (note: total_price is not inserted)
INSERT INTO
    sales (price, quantity)
VALUES
    (100.00, 2),
    (50.00, 5),
    (200.00, 1);

-- Select from the table (total_price will be computed on the fly)
SELECT
    *
FROM
    sales;