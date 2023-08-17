import { useEffect, useState } from "react";
import { createCard, fetchCardsForList } from "../requests";

export default function Card({ list, cards, setCards }) {
  const [cardTitle, setCardTitle] = useState("");
  const [displayForm, setDisplayForm] = useState(false);

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
              <div>{card.cardtitle}</div>
            </div>
          );
        })}
      <div className="add-new-card">
        <button onClick={() => setDisplayForm(true)}>+ Add a card</button>
        {displayForm && (
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
            ></input>
            <div className="add-card-btn">
              <button className="add-btn" onClick={handleCreateCard}>
                Add card
              </button>
              <button
                className="cross-btn"
                onClick={() => setDisplayForm(false)}
              >
                {"\u00d7"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
