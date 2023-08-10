import express from "express";
import {
  getBoard,
  getLists,
  getCards,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../controller/trelloController.js";

const router = express.Router();

router.route("/boards").get(getBoard).post(createBoard);
router.route("/boards/:id").put(updateBoard).delete(deleteBoard);

router.route("/lists").get(getLists);

router.route("/cards").get(getCards);

export default router;
