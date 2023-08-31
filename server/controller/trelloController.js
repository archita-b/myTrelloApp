import {
  getBoardsDB,
  createBoardDB,
  updateBoardDB,
  deleteBoardDB,
  getListsForBoardDB,
  createListDB,
  updateListDB,
  deleteListDB,
  createCardDB,
  updateCardDB,
  deleteCardDB,
} from "../model/trelloModel.js";

export async function getBoard(req, res) {
  try {
    const response = await getBoardsDB();
    const data = await res.json(response);
    return data;
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getListsForBoard(req, res) {
  try {
    const boardId = req.params.board_id;
    const response = await getListsForBoardDB(boardId);
    const data = await res.json(response);
    return data;
  } catch (error) {
    return res.status(500).json({ message: "Error getting lists for board" });
  }
}

export async function createBoard(req, res) {
  try {
    const title = req.body.title;
    if (title.trim() !== "") {
      const response = await createBoardDB(title);
      const data = await res.json(response);
      return data;
    }
  } catch (error) {
    return res.json({ message: "Error creating board" });
  }
}

export async function createList(req, res) {
  try {
    const title = req.body.title;
    const boardId = req.params.board_id;
    const response = await createListDB(title, boardId);
    const data = await res.json(response);
    return data;
  } catch (error) {
    return res.json({ message: "Error creating list" });
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

export async function updateBoard(req, res) {
  try {
    const { title } = req.body.title;
    const boardId = req.params.board_id;
    const response = await updateBoardDB(boardId, title);
    const data = res.json(response);
    return data;
  } catch (error) {
    return res.json({ message: "Error updating board" });
  }
}

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

export async function deleteBoard(req, res) {
  try {
    const boardId = req.params.board_id;
    const response = await deleteBoardDB(boardId);
    const data = await res.json(response);
    return data;
  } catch (error) {
    return res.json({ message: "Error deleting board" });
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
