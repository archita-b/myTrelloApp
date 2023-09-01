import pool from "./database.js";

// get boards
export async function getBoardsDB() {
  const result = await pool.query("SELECT * FROM trelloBoard");
  return result.rows;
}

// get lists
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

// create board
export async function createBoardDB(title) {
  const result = await pool.query(
    "INSERT INTO trelloBoard (title) VALUES ($1) RETURNING *",
    [title]
  );
  if (result.rowCount !== 1) throw new Error("Error creating board");
  return result.rows[0];
}

// create list
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

// create card
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

//update board
export async function updateBoardDB(boardId, title) {
  const result = await pool.query(
    "UPDATE trelloBoard SET title=$1 WHERE id=$2 RETURNING *",
    [title, boardId]
  );
  if (result.rowCount !== 1) throw new Error("Error updating board");
  return result.rows[0];
}

// update list
export async function updateListDB(listId, title) {
  const result = await pool.query(
    "UPDATE trelloLists SET title=$1 WHERE id=$2 RETURNING *",
    [title, listId]
  );
  if (result.rowCount !== 1) throw new Error("Error updating list");
  return result.rows[0];
}

// update card
export async function updateCardDB(
  title,
  description,
  duedate,
  completed,
  cardId
) {
  const result = await pool.query(
    `UPDATE trelloCards SET title=$1, description=$2, duedate=$3, completed=$4 
    WHERE id=$5 RETURNING *`,
    [title, description, duedate, completed, cardId]
  );
  if (result.rowCount !== 1) throw new Error("Error updating card");
  return result.rows[0];
}

// delete board
export async function deleteBoardDB(boardId) {
  const result = await pool.query("DELETE FROM trelloBoard WHERE id=$1", [
    boardId,
  ]);
  if (result.rowCount !== 1) throw new Error("Error deleting board");
  return result.rowCount;
}

// delete list
export async function deleteListDB(listId) {
  const max_list_id = (
    await pool.query(`SELECT id FROM trellolists ORDER BY id DESC LIMIT 1`)
  ).rows[0].id;

  if (max_list_id == listId) {
    return deleteLastList(listId, max_list_id);
  }
  return deleteIntermediateList(listId);
}

async function deleteIntermediateList(listId) {
  await pool.query("BEGIN");

  const idToBeUpdated = (
    await pool.query(`SELECT prev_list_id FROM trellolists WHERE id=$1`, [
      listId,
    ])
  ).rows[0].prev_list_id;

  await pool.query(`DELETE FROM trellolists WHERE id=$1`, [listId]);

  const result = await pool.query(
    `UPDATE trellolists SET prev_list_id=$1 WHERE prev_list_id=$2 RETURNING *`,
    [idToBeUpdated, listId]
  );

  await pool.query("COMMIT");

  if (result.rowCount === 1) return result.rows[0];
}

async function deleteLastList(listId, max_id) {
  if (max_id == listId) {
    const result = await pool.query(`DELETE FROM trellolists WHERE id=$1`, [
      listId,
    ]);
    return result.rowCount;
  }
}

// delete card
export async function deleteCardDB(cardId) {
  const max_card_id = (
    await pool.query(`SELECT id FROM trellocards ORDER BY id DESC LIMIT 1`)
  ).rows[0].id;

  if (max_card_id == cardId) {
    return deleteLastCard(cardId, max_card_id);
  }
  return deleteIntermediateCard(cardId);
}

async function deleteIntermediateCard(cardId) {
  await pool.query("BEGIN");

  const idToBeUpdated = (
    await pool.query(`SELECT prev_card_id FROM trellocards WHERE id=$1`, [
      cardId,
    ])
  ).rows[0].prev_card_id;

  await pool.query(`DELETE FROM trelloCards WHERE id=$1`, [cardId]);

  const result = await pool.query(
    `UPDATE trellocards SET prev_card_id=$1 WHERE prev_card_id=$2 RETURNING *`,
    [idToBeUpdated, cardId]
  );

  await pool.query("COMMIT");

  if (result.rowCount === 1) return result.rows[0];
}

async function deleteLastCard(cardId, max_id) {
  if (max_id == cardId) {
    const result = await pool.query(`DELETE FROM trellocards WHERE id=$1`, [
      cardId,
    ]);
    return result.rowCount;
  }
}

// update lists order
export async function updateListsOrderDB(source_id, dest_id) {
  console.log("dest_id=", dest_id);
  await pool.query("BEGIN");

  const source_prev_list_id = (
    await pool.query(`SELECT prev_list_id FROM trellolists WHERE id=$1`, [
      source_id,
    ])
  ).rows[0].prev_list_id;

  const dest_prev_list_id = (
    await pool.query(`SELECT prev_list_id FROM trellolists WHERE id=$1`, [
      dest_id,
    ])
  ).rows[0].prev_list_id;

  await pool.query(`UPDATE trellolists SET prev_list_id=$1 WHERE id=$2`, [
    source_prev_list_id,
    dest_id,
  ]);

  await pool.query(
    `UPDATE trellolists SET prev_list_id=$1 WHERE prev_list_id=$2`,
    [dest_prev_list_id, dest_id]
  );

  await pool.query(`UPDATE trellolists SET prev_list_id=$1 WHERE id=$2`, [
    dest_id,
    source_id,
  ]);

  const result = await pool.query(`SELECT * FROM trellolists`);

  await pool.query("COMMIT");

  return result.rows;
}
// console.log(await updateListsOrderDB(54, 56));

// update cards order
export async function updateCardsOrderDB(
  source_id,
  dest_id,
  source_list_id,
  dest_list_id
) {
  await pool.query("BEGIN");

  const source_prev_card_id = (
    await pool.query(`SELECT prev_card_id FROM trellocards WHERE id=$1`, [
      source_id,
    ])
  ).rows[0].prev_card_id;

  const dest_prev_card_id = (
    await pool.query(`SELECT prev_card_id FROM trellocards WHERE id=$1`, [
      dest_id,
    ])
  ).rows[0].prev_card_id;

  await pool.query(
    `UPDATE trellocards SET list_id=$1, prev_card_id=$2 WHERE id=$3`,
    [dest_list_id, source_prev_card_id, dest_id]
  );

  await pool.query(
    `UPDATE trellocards SET prev_card_id=$1 WHERE prev_card_id=$2`,
    [dest_prev_card_id, dest_id]
  );

  await pool.query(`UPDATE trellocards SET prev_card_id=$1 WHERE id=$2`, [
    dest_id,
    source_id,
  ]);

  const result = await pool.query(`SELECT * FROM trellocards`);

  await pool.query("COMMIT");

  return result.rows;
}
// console.log(await updateCardsOrderDB(56, 58, 56, 54));
