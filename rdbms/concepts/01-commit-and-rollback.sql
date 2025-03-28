CREATE TABLE IF NOT EXISTS accounts (
    account_id serial PRIMARY KEY,
    name text NOT NULL,
    balance numeric NOT NULL CHECK (balance >= 0)
);

INSERT INTO
    accounts (name, balance)
VALUES
    ('Alice', 500),
    ('Bob', 300);

SELECT
    *
FROM
    accounts;

START transaction;

UPDATE
    accounts
SET
    balance = balance -100
WHERE
    account_id = 1;

UPDATE
    accounts
SET
    balance = balance -600
WHERE
    account_id = 2;

COMMIT;