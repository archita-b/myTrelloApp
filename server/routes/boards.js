import express from "express";
import {
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  getListsForBoard,
  createList,
} from "../controller/trelloController.js";

const router = express.Router();

router.get("/", getBoard);
router.post("/", createBoard);

router.get("/:board_id", getListsForBoard);
router.put("/:board_id", updateBoard);
router.delete("/:board_id", deleteBoard);

router.post("/:board_id/lists", createList);

// router.route("/lists/updateOrder").put(updateListsOrder);
// router.route("/cards/updateOrder").put(updateCardsOrder);

export default router;
