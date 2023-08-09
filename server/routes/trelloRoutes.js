import express from "express";
import {
  getBoard,
  getLists,
  getCards,
} from "../controller/trelloController.js";

const router = express.Router();

router.route("/boards").get(getBoard);

router.route("/lists").get(getLists);

router.route("/cards").get(getCards);

export default router;
