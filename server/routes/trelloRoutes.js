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
  createCard,
  updateCard,
  deleteCard,
  updateListsOrder,
  updateCardsOrder,
} from "../controller/trelloController.js";

const router = express.Router();

router.route("/boards").get(getBoard).post(createBoard);

router
  .route("/boards/:board_id")
  .get(getListsForBoard)
  .put(updateBoard)
  .delete(deleteBoard);

router.route("/boards/:board_id/lists").post(createList);

router.route("/lists/:list_id").put(updateList).delete(deleteList);
router.route("/lists/:list_id/cards").post(createCard);
router.route("/lists/updateOrder").put(updateListsOrder);

router.route("/cards/:card_id").put(updateCard).delete(deleteCard);
router.route("/cards/updateOrder").put(updateCardsOrder);

export default router;
