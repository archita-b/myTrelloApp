import pool from "./database.js";

export async function getBoardsDB() {
  const result = await pool.query("SELECT * FROM boards");
  return result.rows;
}

export async function createBoardDB(title) {
  const result = await pool.query(
    "INSERT INTO boards (title) VALUES ($1) RETURNING *",
    [title]
  );
  return result.rows[0];
}

export async function getListsForBoardDB(boardId) {
  const result = await pool.query(
    `SELECT lists.*, 
      COALESCE(json_agg(cards.*) FILTER (WHERE cards.list_id IS NOT NULL),'[]') 
      AS cards
      FROM lists
      LEFT JOIN
      cards ON lists.id = cards.list_id 
      WHERE lists.board_id=$1
      GROUP BY lists.id ORDER BY lists.id`,
    [boardId]
  );
  return result.rows;
}

export async function updateBoardDB(boardId, title) {
  const result = await pool.query(
    "UPDATE boards SET title=$1 WHERE id=$2 RETURNING *",
    [title, boardId]
  );
  return result.rows[0];
}

export async function deleteBoardDB(boardId) {
  const result = await pool.query("DELETE FROM boards WHERE id=$1", [boardId]);
  return result.rowCount;
}

export async function createListDB(title, boardId) {
  const result = await pool.query(
    "INSERT INTO lists (title, board_id) VALUES ($1, $2) RETURNING *",
    [title, boardId]
  );
  return result.rows[0];
}
