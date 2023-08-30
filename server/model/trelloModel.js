import pool from "./database.js";

export async function getBoardsDB() {
  const result = await pool.query("SELECT * FROM trelloBoard");
  return result.rows;
}

export async function getListsForBoardDB(boardId) {
  const result = await pool.query(
    `SELECT trellolists.*, 
    COALESCE(json_agg(trellocards.*) FILTER (WHERE trellocards.list_id IS NOT NULL),'[]') 
    AS cards
    FROM trellolists
    LEFT JOIN
    trellocards ON trellolists.id = trellocards.list_id 
    WHERE trellolists.board_id=$1
    GROUP BY trellolists.id ORDER BY trellolists.id`,
    [boardId]
  );
  return result.rows;
}

export async function createBoardDB(title) {
  const result = await pool.query(
    "INSERT INTO trelloBoard (title) VALUES ($1) RETURNING *",
    [title]
  );
  if (result.rowCount !== 1) throw new Error("Error creating board");
  return result.rows[0];
}

export async function createListDB(title, boardId) {
  await pool.query("BEGIN");

  const max_id_result = (
    await pool.query(`SELECT id FROM trellolists ORDER BY id DESC LIMIT 1`)
  ).rows[0];

  const max_id = max_id_result === undefined ? null : max_id_result.id;

  (
    await pool.query(
      `INSERT INTO trelloLists(title,board_id) VALUES ($1,$2) RETURNING *`,
      [title, boardId]
    )
  ).rows[0];

  const new_max_id = (
    await pool.query(`SELECT id FROM trellolists ORDER BY id DESC LIMIT 1`)
  ).rows[0].id;

  const result = await pool.query(
    `UPDATE trellolists SET prev_list_id=$1 
    WHERE id=$2 RETURNING *`,
    [max_id, new_max_id]
  );

  await pool.query("COMMIT");
  return result.rows[0];
}

export async function createCardDB(
  title,
  description,
  duedate,
  completed,
  listId
) {
  await pool.query("BEGIN");

  const max_id_result = (
    await pool.query(`SELECT id FROM trellocards ORDER BY id DESC LIMIT 1`)
  ).rows[0];

  const max_id = max_id_result === undefined ? null : max_id_result.id;

  (
    await pool.query(
      `INSERT INTO trelloCards (title,description,duedate,completed,list_id) 
    VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [title, description, duedate, completed, listId]
    )
  ).rows[0];

  const new_max_id = (
    await pool.query(`SELECT id FROM trellocards ORDER BY id DESC LIMIT 1`)
  ).rows[0].id;

  const result = await pool.query(
    `UPDATE trellocards SET prev_card_id=$1 
    WHERE id=$2 RETURNING *`,
    [max_id, new_max_id]
  );

  await pool.query("COMMIT");
  return result.rows[0];
}

export async function updateBoardDB(boardId, title) {
  const result = await pool.query(
    "UPDATE trelloBoard SET title=$1 WHERE id=$2 RETURNING *",
    [title, boardId]
  );
  if (result.rowCount !== 1) throw new Error("Error updating board");
  return result.rows[0];
}

export async function updateListDB(listId, title) {
  const result = await pool.query(
    "UPDATE trelloLists SET title=$1 WHERE id=$2 RETURNING *",
    [title, listId]
  );
  if (result.rowCount !== 1) throw new Error("Error updating list");
  return result.rows[0];
}

export async function updateCardDB(
  title,
  description,
  duedate,
  completed,
  cardId
) {
  const result = await pool.query(
    `UPDATE trelloCards SET title=$1, description=$2, duedate=$3, completed=$4 
    WHERE id=$5 RETURNING * ORDER BY id ASC`,
    [title, description, duedate, completed, cardId]
  );
  if (result.rowCount !== 1) throw new Error("Error updating card");
  return result.rows[0];
}

export async function deleteBoardDB(boardId) {
  const result = await pool.query("DELETE FROM trelloBoard WHERE id=$1", [
    boardId,
  ]);
  if (result.rowCount !== 1) throw new Error("Error deleting board");
  return result.rowCount;
}

export async function deleteListDB(listId) {
  const result = await pool.query("DELETE FROM trelloLists WHERE id=$1", [
    listId,
  ]);
  if (result.rowCount !== 1) throw new Error("Error deleting list");
  return result.rowCount;
}

export async function deleteCardDB(cardId) {
  await pool.query("BEGIN");

  const idToBeUpdated = (
    await pool.query(`SELECT prev_card_id FROM trellocards WHERE id=$1`, [
      cardId,
    ])
  ).rows[0].prev_card_id;

  await pool.query(`DELETE FROM trelloCards WHERE id=$1`, [cardId]);

  const result = await pool.query(
    `UPDATE trellocards SET prev_card_id=$1 WHERE prev_card_id=$2`,
    [idToBeUpdated, cardId]
  );

  await pool.query("COMMIT");

  if (result.rowCount === 1) return result.rows[0];
}
