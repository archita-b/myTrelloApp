import { useEffect, useState } from "react";
import { createCard, fetchCardsForList } from "../requests";

export default function Card({ list, cards, setCards }) {
  const [cardTitle, setCardTitle] = useState("");
  const [displayForm, setDisplayForm] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [popupcardid, setPopupcardid] = useState(null);

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
            <div className="card-box" key={card.cardid}>
              <div
                className="add-card-title"
                id={card.cardid}
                onClick={(e) => {
                  setPopupcardid(e.target.id);
                  setIsCardOpen(true);
                }}
              >
                {card.cardtitle}
              </div>

              {isCardOpen && card.cardid == popupcardid && (
                <div className="card-popup">
                  <header className="popup-header">
                    <div>
                      <h3>{card.cardtitle}</h3>
                      <p>in list {list.title}</p>
                    </div>

                    <button
                      className="cross-btn"
                      onClick={() => setIsCardOpen(false)}
                    >
                      {"\u00d7"}
                    </button>
                  </header>
                  <br />
                  <br />
                  <label>
                    Description:
                    <br />
                    <textarea placeholder="Add a more detailed description..."></textarea>
                  </label>
                </div>
              )}
            </div>
          );
        })}

      <div className="add-new-item">
        <button className="newitem-btn" onClick={() => setDisplayForm(true)}>
          + Add a card
        </button>
        {displayForm && (
          <form onSubmit={(e) => e.preventDefault()}>
            <textarea
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              placeholder="Enter a title for this card..."
            ></textarea>
            <div>
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
