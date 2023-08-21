import express from "express";
import {
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  getListsForBoard,
  createList,
  updateList,
  deleteList,
  getCardsForBoard,
  createCard,
  updateCard,
  deleteCard,
} from "../controller/trelloController.js";

const router = express.Router();

router.route("/boards").get(getBoard).post(createBoard);
router
  .route("/boards/:board_id")
  .get(getListsForBoard)
  .put(updateBoard)
  .delete(deleteBoard);

router.route("/boards/:board_id/lists").get(getCardsForBoard).post(createList);

router.route("/lists/:list_id").put(updateList).delete(deleteList); //check

router.route("/lists/:list_id/cards").post(createCard);

router.route("/cards/:card_id").put(updateCard).delete(deleteCard);

export default router;
