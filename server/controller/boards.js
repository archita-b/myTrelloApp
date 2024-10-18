import {
  getBoardsDB,
  createBoardDB,
  getListsForBoardDB,
  updateBoardDB,
  deleteBoardDB,
  createListDB,
} from "../model/boards.js";

export async function getBoards(req, res) {
  try {
    const boards = await getBoardsDB();
    res.status(200).json(boards);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function createBoard(req, res) {
  try {
    const title = req.body.title;

    if (title.trim() !== "") {
      const response = await createBoardDB(title);
      res.status(201).json(response);
    }
  } catch (error) {
    return res.status(500).json({ message: "Error creating board" });
  }
}

export async function getListsForBoard(req, res) {
  try {
    const boardId = req.params.board_id;
    const response = await getListsForBoardDB(boardId);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching lists for board" });
  }
}

export async function updateBoard(req, res) {
  try {
    const { title } = req.body;
    const boardId = req.params.board_id;
    const response = await updateBoardDB(boardId, title);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Error updating board" });
  }
}

export async function deleteBoard(req, res) {
  try {
    const boardId = req.params.board_id;
    await deleteBoardDB(boardId);
    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting board" });
  }
}

export async function createList(req, res) {
  try {
    const { title } = req.body;
    const boardId = req.params.board_id;
    const response = await createListDB(title, boardId);
    res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Error creating list" });
  }
}
