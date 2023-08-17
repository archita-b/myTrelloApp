import { useEffect, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "../utils/dragDrop";
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

  function onListDrop(dropResult) {
    let newLists = [...lists];
    newLists = applyDrag(newLists, dropResult);
    setLists(newLists);
  }

  return (
    <div className="list-container">
      <Container
        orientation="horizontal"
        onDrop={onListDrop}
        dragHandleSelector=".list-box"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "lists-drop-preview",
        }}
      >
        {lists.map((list) => {
          return (
            <Draggable key={list.id}>
              <div className="list-box">
                <div className="add-list-title">{list.title}</div>
                <Card
                  list={list}
                  cards={cards}
                  setCards={setCards}
                  key={cards}
                />
              </div>
            </Draggable>
          );
        })}
      </Container>

      <div className="add-new-item">
        <button className="newitem-btn" onClick={() => setDisplayForm(true)}>
          + Add another list
        </button>

        {displayForm && (
          <form className="addlist-form" onSubmit={(e) => e.preventDefault()}>
            <textarea
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              placeholder="Enter list title..."
            ></textarea>
            <div>
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
