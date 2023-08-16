import { useState } from "react";
import List from "./list";

export default function Board({ board }) {
  const [lists, setLists] = useState([]);

  return (
    <div className="board-container">
      <h2>{board === null ? "" : board.title}</h2>
      <List board={board} lists={lists} setLists={setLists} />
    </div>
  );
}
