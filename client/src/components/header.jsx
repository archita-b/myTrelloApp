import { useState } from "react";

export default function Header({ addBoard }) {
  const [boardTitle, setBoardTitle] = useState("");

  function handleCreateBoard() {
    if (boardTitle.trim() === "") return;
    addBoard(boardTitle);
    setBoardTitle("");
  }

  return (
    <>
      <h1>Trello-app</h1>
      <label>
        Board-title
        <input
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
          type="text"
        ></input>
      </label>
      <button onClick={handleCreateBoard}>Create Board</button>
    </>
  );
}
