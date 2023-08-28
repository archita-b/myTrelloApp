import { useEffect, useState } from "react";
import List from "./List";
import "./Board.css";
import { createList, fetchListsForBoard, updateBoard } from "../requests";
import AddNewItem from "./AddNewList";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "../utils/dragDrop";

export default function Board({ board }) {
  const [lists, setLists] = useState([]);
  const [listTitle, setListTitle] = useState("");
  const [boardName, setBoardName] = useState(board.title);

  useEffect(() => {
    fetchListsForBoard(board.id).then((data) => {
      if (data) setLists(data);
    });
  }, []);

  function addList(title) {
    createList(title, board.id).then((data) => {
      setLists((currentLists) => [...currentLists, { ...data }]);
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
    <div className="board-container">
      <div className="board-heading">
        <input
          value={boardName}
          onChange={(e) =>
            updateBoard({ ...board, title: e.target.value }, board.id).then(
              (data) => setBoardName(data.title)
            )
          }
        ></input>
      </div>

      <div className="lists-container">
        <Container
          orientation="horizontal"
          onDrop={onListDrop}
          getChildPayload={(index) => lists[index]}
          dragHandleSelector=".add-list-title"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "lists-drop-preview",
          }}
        >
          {lists
            .filter((list) => list.board_id === board.id)
            .map((list) => {
              return (
                <Draggable key={list.id}>
                  <List list={list} />
                </Draggable>
              );
            })}
        </Container>

        <AddNewItem
          listTitle={listTitle}
          setListTitle={setListTitle}
          handleCreateList={handleCreateList}
        />
      </div>
    </div>
  );
}
