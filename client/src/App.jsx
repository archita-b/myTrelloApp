import { useEffect, useState } from "react";
import { fetchBoards } from "./requests";
import Header from "./components/header";
import Board from "./components/board";

function App() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetchBoards().then((data) => {
      setBoards(data);
    });
  }, []);

  return (
    <div className="app-container">
      <Header setBoards={setBoards} />
      <div>
        {boards.map((board) => {
          return <Board board={board} key={board.id} />;
        })}
      </div>
    </div>
  );
}

export default App;
