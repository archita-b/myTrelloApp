import { useEffect, useState } from "react";
import Card from "./card";
import { createList, fetchListsForBoard } from "../requests";

export default function List({ board, lists, setLists }) {
  const [listTitle, setListTitle] = useState("");
  const [cards, setCards] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);

  useEffect(() => {
    if (board !== null) {
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
              <div>{list.title}</div>
            </div>
            <Card list={list} cards={cards} setCards={setCards} />
          </div>
        );
      })}
      <div className="add-new-list">
        <button onClick={() => setDisplayForm(true)}>+ Add another list</button>
        {displayForm && (
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
            ></input>
            <div className="add-list-btn">
              <button className="add-btn" onClick={handleCreateList}>
                Add List
              </button>
              <button
                className="cross-btn"
                onClick={() => setDisplayForm(false)}
              >
                {"\u00d7"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
