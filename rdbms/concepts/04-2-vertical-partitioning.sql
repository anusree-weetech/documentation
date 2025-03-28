-- unpartitioned table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    bio TEXT,
    -- Rarely accessed
    profile_picture BYTEA -- Rarely accessed, large data
);

INSERT INTO
    users (name, email, bio, profile_picture)
SELECT
    'User' || generate_series(1, 1000),
    'user' || generate_series(1, 1000) || '@example.com',
    'This is a long bio text for user' || generate_series(1, 1000),
    NULL
FROM
    generate_series(1, 1000) ON CONFLICT (email) DO NOTHING;

--  Planning Time: 0.126 ms
--  Execution Time: 0.074 ms
EXPLAIN ANALYZE
SELECT
    user_id,
    name,
    email
FROM
    users
WHERE
    user_id = 31999246;

--vertically partitioned table
CREATE TABLE users_core (
    user_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

CREATE TABLE users_details (
    user_id INT PRIMARY KEY REFERENCES users_core(user_id),
    bio TEXT,
    profile_picture BYTEA
);

INSERT INTO
    users_core (name, email)
SELECT
    'User' || generate_series(1, 1000),
    'user' || generate_series(1, 1000) || '@example.com'
FROM
    generate_series(1, 1000) ON conflict (email) DO nothing;

INSERT INTO
    users_details (user_id, bio, profile_picture)
SELECT
    user_id,
    'This is a long bio text for user' || user_id,
    NULL
FROM
    users_core;

EXPLAIN ANALYZE
SELECT
    user_id,
    name,
    email
FROM
    users_core
WHERE
    user_id = 1002002;

--  Planning Time: 0.305 ms
--  Execution Time: 0.040 ms