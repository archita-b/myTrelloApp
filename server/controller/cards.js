import { updateCardDB, deleteCardDB } from "../model/trelloModel.js";

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
    const data = res.json(response);
    return data;
  } catch (error) {
    return res.json({ message: "Error updating card" });
  }
}

export async function deleteCard(req, res) {
  try {
    const cardId = req.params.card_id;
    const response = await deleteCardDB(cardId);
    const data = await res.json(response);
    return data;
  } catch (error) {
    return res.status(500).json({ message: "Error deleting card" });
  }
}
