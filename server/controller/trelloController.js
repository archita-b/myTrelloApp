import {
  updateListsOrderDB,
  updateCardsOrderDB,
} from "../model/trelloModel.js";

export async function updateListsOrder(req, res) {
  try {
    const { source_id, dest_id } = req.body;
    const response = await updateListsOrderDB(source_id, dest_id);
    const data = await res.json(response);
  } catch (error) {
    return res.json({ message: "Error updating cards order" });
  }
}

export async function updateCardsOrder(req, res) {
  try {
    const { source_id, dest_id, source_list_id, dest_list_id } = req.body;
    const response = await updateCardsOrderDB(
      source_id,
      dest_id,
      source_list_id,
      dest_list_id
    );
    const data = await res.json(response);
  } catch (error) {
    return res.json({ message: "Error updating lists order" });
  }
}
