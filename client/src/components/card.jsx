import { useEffect, useState } from "react";
import { createCard, fetchCardsForList } from "../requests";

export default function Card({ list, cards, setCards }) {
  const [cardTitle, setCardTitle] = useState("");

  useEffect(() => {
    if (list !== null) {
      fetchCardsForList().then((data) => {
        setCards(data);
      });
    }
  }, [list]);

  function addCard(title) {
    createCard(title).then((data) => {
      setCards((currentCard) => [...currentCard, ...data]);
    });
  }

  function handleCreateCard() {
    if (cardTitle.trim() === "") return;
    addCard(cardTitle);
  }

  return (
    <div className="card-container">
      {cards
        .filter((card) => card.listid === list.id)
        .map((card) => {
          return (
            <>
              <input value={card.cardtitle}></input>
              <button>Add card</button>
              <button>X</button>
            </>
          );
        })}
    </div>
  );
}
