import express from "express";
import {
  getBoard,
  getListsForBoard,
  getCardsForList,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../controller/trelloController.js";

const router = express.Router();

router.route("/boards").get(getBoard).post(createBoard);
// router.route("/boards/:id").put(updateBoard).delete(deleteBoard);

router.route("/boards/:board_id/lists").get(getListsForBoard);

router.route("/cards").get(getCardsForList);

export default router;
