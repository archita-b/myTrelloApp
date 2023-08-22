import { useEffect, useState } from "react";
import Card from "./Card";
import AddNewCard from "./AddNewCard";
import "./List.css";
import { createCard, fetchCardsForBoard } from "../requests";

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
      setCards((currentCard) => [...currentCard, { ...data }]);
    });
  }

  function handleCreateCard() {
    if (cardTitle.trim() === "") return;
    addCard(cardTitle);
    setCardTitle("");
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
                setCardTitle={setCardTitle}
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
