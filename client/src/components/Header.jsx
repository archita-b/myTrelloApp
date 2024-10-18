import { useState } from "react";
import { createBoard } from "../requests";
import "./Header.css";

export default function Header({ setBoards }) {
  const [boardTitle, setBoardTitle] = useState("");

  function addBoard(title) {
    createBoard(title).then((data) => {
      setBoards((currentBoard) => {
        return [...currentBoard, ...data.title];
      });
    });
  }

  function handleCreateBoard() {
    if (boardTitle.trim() === "") alert("Please provide a name for the board");
    else {
      addBoard(boardTitle);
      setBoardTitle("");
    }
  }

  return (
    <div className="app-heading">
      <h3>Trello-app</h3>
      <input
        value={boardTitle}
        onChange={(e) => setBoardTitle(e.target.value)}
        placeholder="Enter a title for the board..."
        type="text"
      ></input>
      <button onClick={handleCreateBoard}>Create Board</button>
    </div>
  );
}
