import { useEffect, useState } from "react";
import { createBoard, fetchBoards } from "./requests";
import Header from "./components/header";
import Board from "./components/board";

function App() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetchBoards().then((data) => {
      setBoards(data);
    });
  }, []);

  function addBoard(title) {
    createBoard(title).then((data) => {
      setBoards((currentBoard) => {
        return [...currentBoard, ...data];
      });
    });
  }

  return (
    <>
      <Header addBoard={addBoard} />
      <div>
        {boards.map((board) => {
          return <Board board={board} key={board.id} />;
        })}
      </div>
    </>
  );
}

export default App;
