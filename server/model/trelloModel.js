import pool from "./database.js";

export async function getBoardsDB() {
  const result = await pool.query("SELECT * FROM trelloBoard");
  return result.rows;
}

export async function getListsForBoardDB(boardId) {
  const result = await pool.query(
    "SELECT * FROM trelloLists WHERE board_id=$1",
    [boardId]
  );
  return result.rows;
}

export async function getCardsForListDB(listId) {
  const result = await pool.query(
    "SELECT * FROM trelloCards WHERE list_id=$1",
    [listId]
  );
  return result.rows;
}
// console.log(await getCardsForListDB(1, 1));

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
  const result = await pool.query(
    "DELETE FROM trelloBoard WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rowCount;
}
