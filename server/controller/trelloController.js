import {
  getBoardsDB,
  getListsForBoardDB,
  getCardsForListDB,
  createBoardDB,
  updateBoardDB,
  deleteBoardDB,
  createCardForListDB,
  createListForBoardDB,
} from "../model/trelloModel.js";

export function getBoard(req, res) {
  // getBoardsDB().then(res.json.bind(res));
  getBoardsDB().then((data) => res.json(data));
}

export function getListsForBoard(req, res) {
  const boardId = req.params.board_id;
  getListsForBoardDB(boardId).then((data) => res.json(data));
}

export function getCardsForList(req, res) {
  const boardId = req.params.board_id;
  const listId = req.params.list_id;
  getCardsForListDB(boardId, listId).then((data) => res.json(data));
}

export function createListForBoard(req, res) {
  const title = req.body.title;
  const boardId = req.params.board_id;
  createListForBoardDB(title, boardId).then((data) => res.json(data));
}

export function createCardForList(req, res) {
  const title = req.body.title;
  const listId = req.params.list_id;
  createCardForListDB(title, listId).then((data) => res.json(data));
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
