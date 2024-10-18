import pool from "./database.js";

export async function updateCardDB(
  title,
  description,
  duedate,
  completed,
  cardId
) {
  const result = await pool.query(
    `UPDATE cards SET title=$1, description=$2, duedate=$3, completed=$4 
      WHERE id=$5 RETURNING *`,
    [title, description, duedate, completed, cardId]
  );
  return result.rows[0];
}

export async function deleteCardDB(cardId) {
  const result = await pool.query("DELETE FROM cards WHERE id=$1", [cardId]);
  return result.rowCount;
}
