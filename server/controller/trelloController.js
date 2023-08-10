import {
  getBoardsDB,
  getListsDB,
  getCardsDB,
  createBoardDB,
  updateBoardDB,
  deleteBoardDB,
} from "../model/trelloModel.js";

export function getBoard(req, res) {
  getBoardsDB().then((data) => res.json(data));
}

export function getLists(req, res) {
  getListsDB().then((data) => res.json(data));
}

export function getCards(req, res) {
  getCardsDB().then((data) => res.json(data));
}

export function createBoard(req, res) {
  const { title } = req.body;
  createBoardDB(title).then((data) => res.json(data));
}

export function updateBoard(req, res) {
  const { title } = req.body;
  const boardId = req.params.id;
  updateBoardDB(boardId, title).then((data) => res.json(data));
}

export function deleteBoard(req, res) {
  const boardId = req.params.id;
  deleteBoardDB(boardId).then((data) => res.json(data));
}
