import { useState } from "react";
import { createBoard } from "../requests";

export default function Header({ setBoards }) {
  const [boardTitle, setBoardTitle] = useState("");

  function addBoard(title) {
    createBoard(title).then((data) => {
      setBoards((currentBoard) => {
        return [...currentBoard, ...data];
      });
    });
  }

  function handleCreateBoard() {
    if (boardTitle.trim() === "") return;
    addBoard(boardTitle);
    setBoardTitle("");
  }

  return (
    <div className="app-heading">
      <h3>Trello-app</h3>
      <input
        value={boardTitle}
        onChange={(e) => setBoardTitle(e.target.value)}
        type="text"
      ></input>
      <button onClick={handleCreateBoard}>Create</button>
    </div>
  );
}
