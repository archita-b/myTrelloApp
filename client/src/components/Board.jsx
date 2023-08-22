import { useEffect, useState } from "react";
import List from "./List";
import "./Board.css";
import { createList, fetchListsForBoard } from "../requests";
import AddNewItem from "./AddNewList";

export default function Board({ board }) {
  const [lists, setLists] = useState([]);
  const [listTitle, setListTitle] = useState("");

  useEffect(() => {
    fetchListsForBoard(board.id).then((data) => setLists(data));
  }, []);

  function addList(title) {
    createList(title, board.id).then((data) => {
      setLists((currentList) => [...currentList, { ...data }]);
    });
  }

  function handleCreateList() {
    if (listTitle.trim() === "") return;
    addList(listTitle);
    setListTitle("");
  }

  return (
    <div className="board-container">
      <div className="board-heading">{board === null ? "" : board.title}</div>
      <div className="lists-container">
        {lists
          .filter((list) => list.board_id === board.id)
          .map((list) => {
            return <List board={board} list={list} key={list.id} />;
          })}
        <AddNewItem
          listTitle={listTitle}
          setListTitle={setListTitle}
          handleCreateList={handleCreateList}
        />
      </div>
    </div>
  );
}
