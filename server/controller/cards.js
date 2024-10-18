import { updateCardDB, deleteCardDB } from "../model/cards.js";

export async function updateCard(req, res) {
  try {
    const { title, description, duedate, completed } = req.body;
    const cardId = req.params.card_id;
    const response = await updateCardDB(
      title,
      description,
      duedate,
      completed,
      cardId
    );
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Error updating card" });
  }
}

export async function deleteCard(req, res) {
  try {
    const cardId = req.params.card_id;
    await deleteCardDB(cardId);
    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting card" });
  }
}
