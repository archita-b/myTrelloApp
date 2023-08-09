import { getBoardsDB, getListsDB, getCardsDB } from "../model/trelloModel.js";

export function getBoard(req, res) {
  getBoardsDB().then((data) => res.json(data));
}

export function getLists(req, res) {
  getListsDB().then((data) => res.json(data));
}

export function getCards(req, res) {
  getCardsDB().then((data) => res.json(data));
}
