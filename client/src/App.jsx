import { useEffect, useState } from "react";
import {
  createBoard,
  fetchBoards,
  fetchCardsForList,
  fetchListsForBoard,
} from "./requests";

function App() {
  const [boards, setBoards] = useState([]);
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [boardTitle, setBoardTitle] = useState("");

  useEffect(() => {
    fetchBoards().then((data) => {
      setBoards(data);
    });
  }, []);

  useEffect(() => {
    if (boards.length !== 0) {
      fetchListsForBoard(boards[0].id).then((data) => {
        setLists(data);
      });
    }
  }, [boards]);

  useEffect(() => {
    if (lists.length !== 0) {
      fetchCardsForList(boards[0].id, lists[0].id).then((data) => {
        setCards(data);
      });
    }
  }, [lists]);

  function addBoard(title) {
    createBoard(title).then((data) => {
      setBoards((currentBoard) => {
        return [...currentBoard, ...data];
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
      <h1>Trello-app</h1>
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
        <h2>{boards.length === 0 ? "" : boards[0].title}</h2>
        {lists.map((list) => {
          return (
            <div className="list-container" key={list.id}>
              <h3>{list !== null ? list.title : ""}</h3>
              {cards
                .filter((card) => card.list_id === list.id)
                .map((card) => {
                  return (
                    <div className="card-container" key={card.id}>
                      {card !== null ? card.title : ""}
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
