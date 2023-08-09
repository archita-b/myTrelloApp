CREATE TABLE trelloBoard (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL
);

CREATE TABLE trelloLists (
    id SERIAL PRIMARY KEY,
    board_id INTEGER REFERENCES trelloBoard(id),
    title VARCHAR(50) NOT NULL
);

CREATE TABLE trelloCards (
    id SERIAL PRIMARY KEY,
    list_id INTEGER REFERENCES trelloLists(id),
    title VARCHAR(50) NOT NULL
);