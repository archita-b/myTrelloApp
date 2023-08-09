import pool from "./database.js";

export async function getBoardsDB() {
  const result = await pool.query("SELECT * FROM trelloBoard");
  //   console.log("res=", result.rows);
  return result.rows;
}

export async function getListsDB() {
  const result = await pool.query("SELECT * FROM trelloLists"); //change
  //   console.log("res=", result.rows);
  return result.rows;
}

export async function getCardsDB() {
  const result = await pool.query("SELECT * FROM trelloCards"); //change
  //   console.log("res=", result.rows);
  return result.rows;
}
