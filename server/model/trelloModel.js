import pool from "./database.js";

export async function getBoardsDB() {
  const result = await pool.query("SELECT * FROM trelloBoard");
  //   console.log("res=", result.rows);
  return result.rows;
}

export async function getListsDB() {
  const result = await pool.query("SELECT * FROM trelloLists");
  return result.rows;
}

export async function getCardsDB() {
  const result = await pool.query("SELECT * FROM trelloCards");
  return result.rows;
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
  const result = await pool.query(
    "DELETE FROM trelloBoard WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rowCount;
}
