import { useEffect, useState } from "react";
import Card from "./Card";
import AddNewCard from "./AddNewCard";
import "./List.css";
import { createCard, fetchCardsForBoard, updateCard } from "../requests";

export default function List({ board, list }) {
  const [cards, setCards] = useState([]);
  const [cardTitle, setCardTitle] = useState("");

  useEffect(() => {
    fetchCardsForBoard(board.id).then((data) => setCards(data));
  }, []);

  function addCard(title) {
    const date = new Date().toISOString().split("T")[0];

    const newCard = {
      title: title,
      description: "",
      duedate: date,
      completed: false,
    };
    createCard(newCard, list.id).then((data) => {
      setCards((currentCards) => [...currentCards, { ...data }]);
    });
  }

  // function setttttcards(data) {
  //   fetchCardsForBoard(board.id).then((data) => setCards(data));
  // }

  function handleCreateCard() {
    if (cardTitle.trim() === "") return;
    addCard(cardTitle);
    setCardTitle("");
  }

  function updateCardTitle(e, newCard, cardId) {
    setCardTitle(e.target.value);
    updateCard(newCard, cardId).then((data) => {
      setCards((currentCards) => [...currentCards, data]);
    });
  }

  return (
    <div className="list-box">
      <div className="add-list-title">{list.title}</div>
      <div>
        {cards
          .filter((card) => card.listid === list.id)
          .map((card) => {
            return (
              <Card
                list={list}
                card={card}
                updateCardTitle={updateCardTitle}
                key={card.cardid}
              />
            );
          })}
      </div>
      <AddNewCard
        cardTitle={cardTitle}
        setCardTitle={setCardTitle}
        handleCreateCard={handleCreateCard}
      />
    </div>
  );
}
