import { useState } from "react";
import List from "./list";

export default function Board({ board }) {
  const [lists, setLists] = useState([]);

  return (
    <div className="board-container">
      <div className="board-heading">{board === null ? "" : board.title}</div>
      <List board={board} lists={lists} setLists={setLists} />
    </div>
  );
}
