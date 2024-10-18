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

-- select both from cards table & lists table by joining them
-- SELECT trellocards.id AS cardid, trellolists.id AS listid, 
-- trellocards.title AS cardtitle, trellolists.title AS listtitle, 
-- trelloCards.description, trelloCards.duedate, trelloCards.completed
-- FROM trellocards 
-- INNER JOIN trellolists ON trellocards.list_id=trellolists.id;

-- select items from lists table to get the cards as an array in list object
-- SELECT trellolists.*, json_agg(trellocards.*) AS cards
-- FROM trellolists
-- LEFT JOIN
-- trellocards ON trellolists.id = trellocards.list_id 
-- WHERE trellolists.board_id=1
-- GROUP BY trellolists.id;

-- delete a table that has references
DROP TABLE <table_name> CASCADE;

