import express from "express";
import {
  getBoards,
  createBoard,
  updateBoard,
  deleteBoard,
  getListsForBoard,
  createList,
} from "../controller/boards.js";

const router = express.Router();

router.get("/", getBoards);
router.post("/", createBoard);

router.get("/:board_id", getListsForBoard);
router.put("/:board_id", updateBoard);
router.delete("/:board_id", deleteBoard);

router.post("/:board_id/lists", createList);

// router.route("/lists/updateOrder").put(updateListsOrder);
// router.route("/cards/updateOrder").put(updateCardsOrder);

export default router;
