import express from "express";
import { updateList, deleteList, createCard } from "../controller/lists.js";

const router = express.Router();

router.put("/:list_id", updateList);
router.delete("/:list_id", deleteList);
router.post("/:list_id/cards", createCard);

export default router;
