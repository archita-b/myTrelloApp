import { updateListDB, deleteListDB, createCardDB } from "../model/lists.js";

export async function updateList(req, res) {
  try {
    const { title } = req.body;
    const listId = req.params.list_id;
    const response = await updateListDB(listId, title);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Error updating list" });
  }
}

export async function deleteList(req, res) {
  try {
    const listId = req.params.list_id;
    await deleteListDB(listId);
    res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting list" });
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
    res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Error creating card" });
  }
}
