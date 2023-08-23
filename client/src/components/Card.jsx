import { useState } from "react";
import "./Card.css";
import { updateCard } from "../requests";

export default function Card({ list, card, updateCardTitle }) {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [poppedCardID, setPoppedCardID] = useState(null);
  const [description, setDescription] = useState(card.description);
  const [duedate, setDuedate] = useState(card.duedate);
  const [checked, setChecked] = useState(card.completed);

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
              <br />
              <p>in list {list.title}</p>
            </div>

            <button className="cross-btn" onClick={() => setIsCardOpen(false)}>
              {"\u00d7"}
            </button>
          </header>
          <br />
          <br />
          <label>
            Due Date:
            <input
              type="date"
              value={duedate}
              min={today}
              onChange={(e) => {
                setDuedate(e.target.value);
                updateCard({ ...card, duedate: e.target.value }, card.cardid);
              }}
            />
          </label>
          <br />
          <br />
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.value);
                updateCard({ ...card, completed: e.target.value }, card.cardid);
              }}
            />
            completed
          </label>
          <br />
          <br />
          <label>
            Description:
            <br />
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                updateCard(
                  { ...card, description: e.target.value },
                  card.cardid
                );
              }}
              placeholder="Add a more detailed description..."
            ></textarea>
          </label>
        </div>
      )}
    </div>
  );
}
