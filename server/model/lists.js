import pool from "./database.js";

export async function updateListDB(listId, title) {
  const result = await pool.query(
    "UPDATE lists SET title=$1 WHERE id=$2 RETURNING *",
    [title, listId]
  );
  return result.rows[0];
}

export async function deleteListDB(listId) {
  await pool.query("DELETE FROM lists WHERE id=$1", [listId]);
  return result.rowCount;
}

export async function createCardDB(
  title,
  description,
  duedate,
  completed,
  listId
) {
  const result = await pool.query(
    `INSERT INTO cards (title, description, duedate, completed, list_id) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [title, description, duedate, completed, listId]
  );
  return result.rows[0];
}
