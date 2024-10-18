import pool from "./database.js";

// get boards
// export async function getBoardsDB() {
//   const result = await pool.query("SELECT * FROM trelloBoard");
//   return result.rows;
// }

// get lists
// export async function getListsForBoardDB(boardId) {
//   const result = await pool.query(
//     `SELECT trellolists.*,
//     COALESCE(json_agg(trellocards.*) FILTER (WHERE trellocards.list_id IS NOT NULL),'[]')
//     AS cards
//     FROM trellolists
//     LEFT JOIN
//     trellocards ON trellolists.id = trellocards.list_id
//     WHERE trellolists.board_id=$1
//     GROUP BY trellolists.id ORDER BY trellolists.id`,
//     [boardId]
//   );
//   return result.rows;
// }

// create board
// export async function createBoardDB(title) {
//   const result = await pool.query(
//     "INSERT INTO trelloBoard (title) VALUES ($1) RETURNING *",
//     [title]
//   );
//   if (result.rowCount !== 1) throw new Error("Error creating board");
//   return result.rows[0];
// }

// create list
// export async function createListDB(title, boardId) {
//   const last_list_id = (
//     await pool.query(`SELECT last_list_id FROM trelloboard WHERE id=$1`, [
//       boardId,
//     ])
//   ).rows[0].last_list_id;

//   await pool.query("BEGIN");

//   (
//     await pool.query(
//       `INSERT INTO trelloLists(title,board_id) VALUES ($1,$2) RETURNING *`,
//       [title, boardId]
//     )
//   ).rows[0];

//   const max_id = (
//     await pool.query(`SELECT id FROM trellolists ORDER BY id DESC LIMIT 1`)
//   ).rows[0].id;

//   const result = await pool.query(
//     `UPDATE trellolists SET prev_list_id=$1 WHERE id=$2 RETURNING *`,
//     [last_list_id, max_id]
//   );

//   await pool.query(`UPDATE trelloboard SET last_list_id=$1 WHERE id=$2`, [
//     max_id,
//     boardId,
//   ]);

//   await pool.query("COMMIT");
//   return result.rows[0];
// }

// create card
// export async function createCardDB(
//   title,
//   description,
//   duedate,
//   completed,
//   listId
// ) {
//   const last_card_id = (
//     await pool.query(`SELECT last_card_id FROM trellolists WHERE id=$1`, [
//       listId,
//     ])
//   ).rows[0].last_card_id;

//   await pool.query("BEGIN");

//   (
//     await pool.query(
//       `INSERT INTO trelloCards (title,description,duedate,completed,list_id)
//        VALUES ($1,$2,$3,$4,$5) RETURNING *`,
//       [title, description, duedate, completed, listId]
//     )
//   ).rows[0];

//   const max_id = (
//     await pool.query(`SELECT id FROM trellocards ORDER BY id DESC LIMIT 1`)
//   ).rows[0].id;

//   const result = await pool.query(
//     `UPDATE trellocards SET prev_card_id=$1 WHERE id=$2 RETURNING *`,
//     [last_card_id, max_id]
//   );

//   await pool.query(`UPDATE trellolists SET last_card_id=$1 WHERE id=$2`, [
//     max_id,
//     listId,
//   ]); //check

//   await pool.query("COMMIT");
//   return result.rows[0];
// }

//update board
// export async function updateBoardDB(boardId, title) {
//   const result = await pool.query(
//     "UPDATE trelloBoard SET title=$1 WHERE id=$2 RETURNING *",
//     [title, boardId]
//   );
//   if (result.rowCount !== 1) throw new Error("Error updating board");
//   return result.rows[0];
// }

// update list
// export async function updateListDB(listId, title) {
//   const result = await pool.query(
//     "UPDATE trelloLists SET title=$1 WHERE id=$2 RETURNING *",
//     [title, listId]
//   );
//   if (result.rowCount !== 1) throw new Error("Error updating list");
//   return result.rows[0];
// }

// update card
// export async function updateCardDB(
//   title,
//   description,
//   duedate,
//   completed,
//   cardId
// ) {
//   const result = await pool.query(
//     `UPDATE trelloCards SET title=$1, description=$2, duedate=$3, completed=$4
//     WHERE id=$5 RETURNING *`,
//     [title, description, duedate, completed, cardId]
//   );
//   if (result.rowCount !== 1) throw new Error("Error updating card");
//   return result.rows[0];
// }

// delete board
// export async function deleteBoardDB(boardId) {
//   const result = await pool.query("DELETE FROM trelloBoard WHERE id=$1", [
//     boardId,
//   ]);
//   if (result.rowCount !== 1) throw new Error("Error deleting board");
//   return result.rowCount;
// }

// delete list
// export async function deleteListDB(listId) {
//   const boardId = (
//     await pool.query(`SELECT board_id FROM trellolists WHERE id=$1`, [listId])
//   ).rows[0].board_id;

//   const last_list_id = (
//     await pool.query(`SELECT last_list_id FROM trelloboard WHERE id=$1`, [
//       boardId,
//     ])
//   ).rows[0].last_list_id;

//   if (listId == last_list_id) {
//     return deleteLastList(listId, boardId);
//   }
//   return deleteIntermediateList(listId);
// }

// async function deleteIntermediateList(listId) {
//   const idToBeUpdated = (
//     await pool.query(`SELECT prev_list_id FROM trellolists WHERE id=$1`, [
//       listId,
//     ])
//   ).rows[0].prev_list_id;

//   await pool.query("BEGIN");

//   await pool.query(`DELETE FROM trellolists WHERE id=$1`, [listId]);

//   const result = await pool.query(
//     `UPDATE trellolists SET prev_list_id=$1 WHERE prev_list_id=$2 RETURNING *`,
//     [idToBeUpdated, listId]
//   );

//   await pool.query("COMMIT");

//   if (result.rowCount === 1) return result.rows[0];
// }

// async function deleteLastList(listId, boardId) {
//   const prev_list_id = (
//     await pool.query(`SELECT prev_list_id FROM trellolists WHERE id=$1`, [
//       listId,
//     ])
//   ).rows[0].prev_list_id;

//   await pool.query("BEGIN");

//   await pool.query(`DELETE FROM trellolists WHERE id=$1`, [listId]);
//   const result = await pool.query(
//     `UPDATE trelloboard SET last_list_id=$1 WHERE id=$2 RETURNING *`,
//     [prev_list_id, boardId]
//   );

//   await pool.query("COMMIT");
//   return result.rows[0];
// }

// delete card
// export async function deleteCardDB(cardId) {
//   const listId = (
//     await pool.query(`SELECT list_id FROM trellocards WHERE id=$1`, [cardId])
//   ).rows[0].list_id;

//   const last_card_id = (
//     await pool.query(`SELECT last_card_id FROM trellolists WHERE id=$1`, [
//       listId,
//     ])
//   ).rows[0].last_card_id;

//   if (cardId == last_card_id) {
//     return deleteLastCard(cardId, listId);
//   }
//   return deleteIntermediateCard(cardId);
// }

// async function deleteIntermediateCard(cardId) {
//   await pool.query("BEGIN");

//   const idToBeUpdated = (
//     await pool.query(`SELECT prev_card_id FROM trellocards WHERE id=$1`, [
//       cardId,
//     ])
//   ).rows[0].prev_card_id;

//   await pool.query(`DELETE FROM trelloCards WHERE id=$1`, [cardId]);

//   const result = await pool.query(
//     `UPDATE trellocards SET prev_card_id=$1 WHERE prev_card_id=$2 RETURNING *`,
//     [idToBeUpdated, cardId]
//   );

//   await pool.query("COMMIT");

//   return result.rows[0];
// }

// async function deleteLastCard(cardId, listId) {
//   const prev_card_id = (
//     await pool.query(`SELECT prev_card_id FROM trellocards WHERE id=$1`, [
//       cardId,
//     ])
//   ).rows[0].prev_card_id;

//   await pool.query("BEGIN");

//   await pool.query(`DELETE FROM trellocards WHERE id=$1`, [cardId]);

//   const result = await pool.query(
//     `UPDATE trellolists SET last_card_id=$1 WHERE id=$2 RETURNING *`,
//     [prev_card_id, listId]
//   );

//   await pool.query("COMMIT");
//   return result.rows[0];
// }

// update lists order
export async function updateListsOrderDB(source_id, dest_id) {
  const source_prev_list_id = (
    await pool.query(
      `SELECT prev_list_id FROM trellolists WHERE id=$1`,
      source_id
    )
  ).rows[0].prev_list_id;

  const dest_prev_list_id = (
    await pool.query(
      `SELECT prev_list_id FROM trellolists WHERE id=$1`,
      dest_id
    )
  ).rows[0].prev_list_id;

  const last_list_id = (
    await pool.query(
      `SELECT last_list_id FROM trelloboard WHERE id=(SELECT board_id FROM trellolists WHERE id=$1)`,
      [source_id]
    )
  ).rows[0].last_list_id;

  if (source_id == last_list_id) {
    return lastListMoved(
      source_id,
      dest_id,
      source_prev_list_id,
      dest_prev_list_id,
      last_list_id
    );
  }
  return intermediateListMoved(
    source_id,
    dest_id,
    source_prev_list_id,
    dest_prev_list_id
  );
}

async function intermediateListMoved(
  source_id,
  dest_id,
  source_prev_id,
  dest_prev_id
) {
  await pool.query("BEGIN");

  await pool.query(`UPDATE trellolists SET prev_list_id=$1 WHERE id=$2`, [
    dest_prev_id,
    source_id,
  ]);
  await pool.query(
    `UPDATE trellolists SET prev_list_id=$1 WHERE prev_list_id=$2`,
    [source_prev_id, source_id]
  );
  await pool.query(`UPDATE trellolists SET prev_list_id=$1 WHERE id=$2`, [
    source_id,
    dest_id,
  ]);

  await pool.query("COMMIT");
  // return result.rows;
}

async function lastListMoved(
  source_id,
  dest_id,
  source_prev_id,
  dest_prev_id,
  last_id
) {
  await pool.query("BEGIN");

  await pool.query(`UPDATE trellolists SET prev_list_id=$1 WHERE id=$2`, [
    dest_prev_id,
    source_id,
  ]);

  await pool.query(`UPDATE trellolists SET prev_list_id=$1 WHERE id=$2`, [
    source_id,
    dest_id,
  ]);

  await pool.query(`UPDATE trelloboard SET last_id=$1 WHERE id=$2`, [
    source_prev_id,
    source_prev_id,
  ]);

  await pool.query("COMMIT");
}

// update cards order
export async function updateCardsOrderDB(
  source_id,
  dest_id,
  source_list_id,
  dest_list_id
) {
  const source_prev_card_id = (
    await pool.query(
      `SELECT prev_card_id FROM trellocards WHERE id=$1`,
      source_id
    )
  ).rows[0].prev_card_id;

  const dest_prev_card_id = (
    await pool.query(
      `SELECT prev_card_id FROM trellocards WHERE id=$1`,
      dest_id
    )
  ).rows[0].prev_card_id;

  const source_last_card_id = (
    await pool.query(
      `SELECT last_card_id FROM trellolists WHERE id=(SELECT list_id FROM trellocards WHERE id=$1)`,
      [source_id]
    )
  ).rows[0].last_card_id;

  const dest_last_card_id = (
    await pool.query(
      `SELECT last_card_id FROM trellolists WHERE id=(SELECT list_id FROM trellocards WHERE id=$1)`,
      [dest_id]
    )
  ).rows[0].last_card_id;

  if (source_id != source_last_card_id && dest_id != dest_last_card_id) {
    return intermediateCardMoved(
      source_id,
      dest_id,
      source_list_id,
      dest_list_id,
      source_prev_card_id,
      dest_prev_card_id
    );
  }
  return lastCardMoved(
    source_id,
    dest_id,
    source_list_id,
    dest_list_id,
    source_prev_card_id,
    dest_prev_card_id,
    source_last_card_id,
    dest_last_card_id
  );
}

async function intermediateCardMoved(
  source_id,
  dest_id,
  source_list_id,
  dest_list_id,
  source_prev_id,
  dest_prev_id
) {
  await pool.query("BEGIN");

  await pool.query(
    `UPDATE trellocards SET list_id=$1,prev_card_id=$2 WHERE id=$3`,
    [dest_list_id, dest_prev_id, source_id]
  );
  await pool.query(
    `UPDATE trellocards SET prev_card_id=$1 WHERE prev_card_id=$2`,
    [source_prev_id, source_id]
  );
  await pool.query(`UPDATE trellocards SET prev_card_id=$1 WHERE id=$2`, [
    source_id,
    dest_id,
  ]);

  await pool.query("COMMIT");
}

async function lastCardMoved(
  source_id,
  dest_id,
  source_list_id,
  dest_list_id,
  source_prev_id,
  dest_prev_id,
  source_last_id,
  dest_last_id
) {
  // await pool.query("BEGIN");

  await pool.query(`UPDATE trellocards SET prev_card_id=$1 WHERE id=$2`, [
    dest_prev_id,
    source_id,
  ]);

  await pool.query(`UPDATE trellocards SET prev_card_id=$1 WHERE id=$2`, [
    source_id,
    dest_id,
  ]);

  if (source_id == source_last_id) {
    await pool.query(`UPDATE trellolists SET last_card_id=$1 WHERE id=$2`, [
      source_prev_id,
      source_list_id,
    ]);
  }

  if (dest_prev_id == dest_last_id) {
    await pool.query(`UPDATE trellolists SET last_card_id=$1 WHERE id=$2`, [
      source_id,
      dest_list_id,
    ]);
  }

  // await pool.query("COMMIT");
}
