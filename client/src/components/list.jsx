import { useEffect, useState } from "react";
import Card from "./card";
import { fetchListsForBoard } from "../requests";

export default function List({ boards, lists, setLists, addList }) {
  const [listTitle, setListTitle] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (boards.length !== 0) {
      fetchListsForBoard(boards[0].id).then((data) => {
        setLists(data);
      });
    }
  }, [boards]);

  function handleCreateList() {
    if (listTitle.trim() === "") return;
    addList(listTitle);
    setListTitle("");
  }

  return (
    <div className="list-container">
      {lists.map((list) => {
        return (
          <div key={list.id}>
            <div className="add-list-title">
              <input
                value={list.title}
                onChange={(e) => setListTitle(e.target.value)}
              ></input>
            </div>
            <Card list={list} cards={cards} setCards={setCards} />
          </div>
        );
      })}
      <textarea placeholder="Enter list title..."></textarea>
      <button>Add List</button>
      <button>X</button>
    </div>
  );
}
