import { useEffect, useState } from "react";
import Card from "./card";
import { createList, fetchListsForBoard } from "../requests";

export default function List({ board, lists, setLists }) {
  const [listTitle, setListTitle] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (board !== 0) {
      fetchListsForBoard(board.id).then((data) => {
        setLists(data);
      });
    }
  }, [board]);

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
    <div className="list-container">
      {lists.map((list) => {
        return (
          <div className="list-box" key={list.id}>
            <div className="add-list-title">
              <h3>{list.title}</h3>
            </div>
            <Card list={list} cards={cards} setCards={setCards} />
          </div>
        );
      })}
      <div className="add-new-list">
        <textarea
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          placeholder="Enter list title..."
        ></textarea>
        <div>
          <button className="add-btn" onClick={handleCreateList}>
            Add List
          </button>
          <button className="cross-btn">{"\u00d7"}</button>
        </div>
      </div>
    </div>
  );
}
