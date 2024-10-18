import express from "express";
import { updateCard, deleteCard } from "../controller/cards.js";

const router = express.Router();

router.put("/:card_id", updateCard);
router.delete("/:card_id", deleteCard);

export default router;
