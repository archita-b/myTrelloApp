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
    createCard(title, list.id).then((data) => {
      setCards((currentCards) => [...currentCards, { ...data }]);
    });
  }

  function handleCreateCard() {
    if (cardTitle.trim() === "") return;
    addCard(cardTitle);
    setCardTitle("");
  }

  return (
    <div className="card-container">
      {cards
        .filter((card) => card.listid === list.id)
        .map((card) => {
          return (
            <div className="add-card-title" key={card.cardid}>
              <h4>{card.cardtitle}</h4>
            </div>
          );
        })}
      <div className="add-new-card">
        <textarea
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
          placeholder="Enter a title for this card..."
        ></textarea>
        <div>
          <button className="add-btn" onClick={handleCreateCard}>
            Add card
          </button>
          <button className="cross-btn">{"\u00d7"}</button>
        </div>
      </div>
    </div>
  );
}
