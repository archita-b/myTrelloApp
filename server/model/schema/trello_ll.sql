-- create boards table
CREATE TABLE trelloboard (
    id SERIAL PRIMARY KEY,
    last_list_id INTEGER DEFAULT NULL,
    title VARCHAR(50) NOT NULL
);

-- create lists table
CREATE TABLE trellolists (
    id SERIAL PRIMARY KEY,
    board_id INTEGER REFERENCES trelloBoard(id) ON DELETE CASCADE,
    prev_list_id INTEGER DEFAULT NULL,
    last_card_id INTEGER DEFAULT NULL,
    title VARCHAR(50) NOT NULL
);

-- create cards table
CREATE TABLE trellocards (
    id SERIAL PRIMARY KEY,
    list_id INTEGER REFERENCES trellolists(id) ON DELETE CASCADE,
    prev_card_id INTEGER DEFAULT NULL,
    title VARCHAR(50) NOT NULL,
    description TEXT,
    duedate TIMESTAMP,
    completed BOOLEAN DEFAULT FALSE
);

-- delete a table that has references
DROP TABLE <table_name> CASCADE;

