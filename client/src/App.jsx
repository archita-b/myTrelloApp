import { useEffect, useState } from "react";
import {
  createBoard,
  fetchBoards,
  fetchCardsForList,
  fetchListsForBoard,
  createCard,
} from "./requests";
import Header from "./components/header";
import Board from "./components/board";

function App() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetchBoards().then((data) => {
      setBoards(data);
    });
  }, []);

  // useEffect(() => {
  //   if (lists.length !== 0) {
  //     fetchCardsForList(boards[0].id).then((data) => {
  //       setCards(data);
  //     });
  //   }
  // }, [lists]);

  function addBoard(title) {
    createBoard(title).then((data) => {
      setBoards((currentBoard) => {
        return [...currentBoard, ...data];
      });
    });
  }

  // function addCard(title) {
  //   createCard(title).then((data) => {
  //     setCards((currentCard) => {
  //       return [...currentCard, ...data];
  //     });
  //   });
  // }

  // function handleCreateCard() {
  //   if (cardTitle.trim() === "") return;
  //   addCard(cardTitle);
  //   setCardTitle("");
  // }

  return (
    <>
      <Header addBoard={addBoard} />
      <Board boards={boards} />
    </>
  );
}

export default App;
