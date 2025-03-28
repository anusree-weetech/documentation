--create accounts table
CREATE TABLE IF NOT EXISTS accounts (
    account_id serial PRIMARY KEY,
    name text NOT NULL,
    balance numeric NOT NULL CHECK (balance >= 0)
);

--insert sample data
INSERT INTO
    accounts (name, balance)
VALUES
    ('Alice', 1000),
    ('Bob', 1000) ON conflict (account_id) DO nothing;

--run in terminal 1
BEGIN;

UPDATE
    accounts
SET
    balance = balance -100
WHERE
    account_id = 1;

--run in terminal 2
BEGIN;

UPDATE
    accounts
SET
    balance = balance -100
WHERE
    account_id = 2;

--then run in terminal 1
UPDATE
    accounts
SET
    balance = balance + 100
WHERE
    accuont_id = 2;

-- now run in terminal 2
UPDATE
    accounts
SET
    balance = balance + 100
WHERE
    accuont_id = 1;