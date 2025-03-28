CREATE TABLE IF NOT EXISTS seats(
    seat_number text PRIMARY KEY,
    STATUS text NOT NULL CHECK (STATUS IN ('available', 'booked'))
);

--insert sample data
INSERT INTO
    seats (seat_number, STATUS)
VALUES
    ('12A', 'available') ON conflict (seat_number) DO nothing;

--prevent duplicate inserts
--to test this run the same code on two terminals
-- begin transaction and not end it. second terminal wil be blocked till we commit the transaction in first terminal
-- run the whole thing on terminal 1 without commmiting
BEGIN;

SELECT
    *
FROM
    seats
WHERE
    seat_number = '12A' FOR
UPDATE
    -- lock the row
;

UPDATE
    seats
SET
    STATUS = 'booked'
WHERE
    seat_number = '12A';

-- run this alone on terminal 2
BEGIN;

SELECT
    *
FROM
    seats
WHERE
    seat_number = '12A' FOR
UPDATE
;

UPDATE
    seats
SET
    STATUS = 'booked'
WHERE
    seat_number = '12A';

COMMIT;