import {
  updateListDB,
  deleteListDB,
  createCardDB,
} from "../model/trelloModel.js";

export async function updateList(req, res) {
  try {
    const { title } = req.body.title;
    const listId = req.params.list_id;
    const response = await updateListDB(listId, title);
    const data = res.json(response);
    return data;
  } catch (error) {
    return res.json({ message: "Error updating list" });
  }
}

export async function deleteList(req, res) {
  try {
    const listId = req.params.list_id;
    const response = await deleteListDB(listId);
    const data = await res.json(response);
    return data;
  } catch (error) {
    return res.json({ message: "Error deleting list" });
  }
}

export async function createCard(req, res) {
  try {
    const { title, description, duedate, completed } = req.body;
    const listId = req.params.list_id;
    const response = await createCardDB(
      title,
      description,
      duedate,
      completed,
      listId
    );
    const data = await res.json(response);
    return data;
  } catch (error) {
    return res.json({ message: "Error creating card" });
  }
}
