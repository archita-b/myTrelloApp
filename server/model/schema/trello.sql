-- create boards table
CREATE TABLE boards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL
);

-- create lists table
CREATE TABLE lists (
    id SERIAL PRIMARY KEY,
    board_id INTEGER REFERENCES boards(id) ON DELETE CASCADE,
    title VARCHAR(50) NOT NULL
);

-- create cards table
CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    list_id INTEGER REFERENCES lists(id) ON DELETE CASCADE,
    title VARCHAR(50) NOT NULL,
    description TEXT,
    duedate TIMESTAMP,
    completed BOOLEAN DEFAULT FALSE
);
