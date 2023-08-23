import { useState } from "react";
import "./Card.css";
import { updateCard } from "../requests";

export default function Card({ list, card, updateCardTitle }) {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [poppedCardID, setPoppedCardID] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="card-box">
      <div
        className="add-card-title"
        id={card.cardid}
        onClick={(e) => {
          setPoppedCardID(e.target.id);
          setIsCardOpen(true);
        }}
      >
        {card.cardtitle}
      </div>

      {isCardOpen && card.cardid == poppedCardID && (
        <div className="card-popup">
          <header className="popup-header">
            <div>
              <input
                value={card.cardtitle}
                onChange={(e) => {
                  updateCardTitle(
                    e,
                    { ...card, cardtitle: e.target.value },
                    card.cardid
                  );
                }}
              />
              <p>in list {list.title}</p>
            </div>

            <button className="cross-btn" onClick={() => setIsCardOpen(false)}>
              {"\u00d7"}
            </button>
          </header>

          <label>
            Due Date:
            <input type="date" value={card.duedate} min={today} />
          </label>

          <label>
            <input type="checkbox" checked={card.completed} />
            completed
          </label>

          <label>
            Description:
            <br />
            <textarea placeholder="Add a more detailed description..."></textarea>
          </label>
        </div>
      )}
    </div>
  );
}
