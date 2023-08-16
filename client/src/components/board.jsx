import { useState } from "react";
import List from "./list";
import { createList } from "../requests";

export default function Board({ boards }) {
  const [lists, setLists] = useState([]);

  function addList(title) {
    createList(title).then((data) => {
      setLists((currentList) => [...currentList, ...data]);
    });
  }

  return (
    <div className="board-container">
      <h2>{boards.length === 0 ? "" : boards[0].title}</h2>
      <List
        boards={boards}
        lists={lists}
        setLists={setLists}
        addList={addList}
      />
    </div>
  );
}
