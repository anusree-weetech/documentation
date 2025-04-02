-- Step 1: Create the sales table with a total_price column
DROP TABLE IF EXISTS sales;

CREATE TABLE sales (
    sale_id SERIAL PRIMARY KEY,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) -- Will store the computed value
);

-- Step 2: Create a trigger function to calculate total_price
-- require trigger in psql (not in mysql/mariadb)
CREATE FUNCTION calculate_total_price() RETURNS TRIGGER AS $$ BEGIN NEW.total_price := NEW.price * NEW.quantity;

RETURN NEW;

END;

$$ LANGUAGE plpgsql;

-- Step 3: Create a trigger to execute before insert or update
CREATE TRIGGER sales_total_price_trigger BEFORE
INSERT
    OR
UPDATE
    ON sales FOR EACH ROW EXECUTE FUNCTION calculate_total_price();

-- Step 4: Insert sample data (total_price will be automatically calculated)
INSERT INTO
    sales (price, quantity)
VALUES
    (100.00, 2),
    (50.00, 5),
    (200.00, 1);

-- Step 5: Query the table to verify total_price is stored
SELECT
    *
FROM
    sales;