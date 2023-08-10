import { useEffect, useState } from "react";
import { createBoard, fetchBoards } from "./requests";

function App() {
  const [boards, setBoards] = useState([]);
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [boardTitle, setBoardTitle] = useState("");

  useEffect(() => {
    fetchBoards().then((data) => setBoards(data));
  }, []);

  function addBoard(title) {
    createBoard(title).then((data) => {
      setBoards((currentBoard) => {
        return [...currentBoard, data];
      });
    });
  }

  function handleclick() {
    if (boardTitle.trim() === "") return;
    addBoard(boardTitle);
    setBoardTitle("");
  }

  return (
    <>
      <label>
        Board-title
        <input
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
          type="text"
        ></input>
      </label>
      <button onClick={handleclick}>Create Board</button>
      <div className="board-container">
        <h2>{boards.title}</h2>
        {boards.map((board) => {
          return (
            <div className="list-container" key={board.id}>
              {lists.map((list) => {
                return (
                  <div className="card-container" key={list.id}>
                    {cards}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
