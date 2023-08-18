import pool from "./database.js";

export async function getBoardsDB() {
  const result = await pool.query("SELECT * FROM trelloBoard");
  return result.rows;
}
// console.log(await getBoardsDB());

export async function getListsForBoardDB(boardId) {
  const result = await pool.query(
    "SELECT * FROM trelloLists WHERE board_id=$1",
    [boardId]
  );
  return result.rows;
}

export async function getCardsForListDB(boardId, listId) {
  const result = await pool.query(
    `SELECT trelloCards.id as cardId, trelloLists.id as listId, trelloCards.title as cardTitle, trelloLists.title as listTitle
      FROM trelloCards 
      INNER JOIN trelloLists ON trelloCards.list_id=trelloLists.id`
  );
  return result.rows;
}

export async function createListForBoardDB(title, boardId) {
  const result = await pool.query(
    "INSERT INTO trelloLists(title,board_id) VALUES ($1,$2) RETURNING *",
    [title, boardId]
  );
  return result.rows[0];
}

export async function createCardForListDB(
  title,
  description,
  duedate,
  completed,
  listId
) {
  const result = await pool.query(
    "INSERT INTO trelloCards(title,description, duedate, completed,list_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [title, description, duedate, completed, listId]
  );
  return result.rows[0];
}

export async function createBoardDB(title) {
  const result = await pool.query(
    "INSERT INTO trelloBoard (title) VALUES ($1) RETURNING *",
    [title]
  );
  return result.rows[0];
}

export async function updateBoardDB(id, title) {
  const result = await pool.query(
    "INSERT INTO trelloBoard SET title=$1 WHERE id=$2 RETURNING *",
    [title, id]
  );
  return result.rows[0];
}

export async function deleteBoardDB(id) {
  const result = await pool.query("DELETE FROM trelloBoard WHERE id=$1", [id]);
  return result.rowCount;
}
