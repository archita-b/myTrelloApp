import {
  getBoardsDB,
  getListsForBoardDB,
  getCardsForListDB,
  createBoardDB,
  updateBoardDB,
  deleteBoardDB,
} from "../model/trelloModel.js";

export function getBoard(req, res) {
  getBoardsDB().then(res.json);
}

export function getListsForBoard(req, res) {
  const boardId = req.params.board_id;
  getListsForBoardDB(boardId).then(res.json);
}

export function getCardsForList(req, res) {
  const boardId = req.params.board_id;
  const listId = req.params.list_id;
  getCardsForListDB(boardId, listId).then(res.json);
}

export function createBoard(req, res) {
  const title = req.body.title;
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
