import { useState } from "react";
import "./Card.css";
import { updateCard } from "../requests";

export default function Card({ list, card, handleDeleteCard }) {
  const timestamp = new Date(card.duedate);
  const date = timestamp.toISOString().split("T")[0];

  const [isCardOpen, setIsCardOpen] = useState(false);
  const [poppedCardID, setPoppedCardID] = useState(null);
  const [cardName, setCardName] = useState(card.title);
  const [duedate, setDuedate] = useState(date);
  const [checked, setChecked] = useState(card.completed);
  const [description, setDescription] = useState(card.description);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="card-box">
      <div
        className="add-card-title"
        id={card.id}
        onClick={(e) => {
          setPoppedCardID(e.target.id);
          setIsCardOpen(true);
        }}
      >
        {card.title}
      </div>

      {isCardOpen && card.id == poppedCardID && (
        <div className="popup-container">
          <div className="card-popup">
            <header className="popup-header">
              <div>
                <input
                  value={cardName}
                  onChange={(e) => {
                    updateCard(
                      { ...card, title: e.target.value },
                      card.id
                    ).then((data) => {
                      setCardName(data.title);
                    });
                  }}
                />
                <br />
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
              Due Date:
              <input
                type="date"
                value={duedate}
                min={today}
                onChange={(e) => {
                  updateCard(
                    { ...card, duedate: e.target.value },
                    card.id
                  ).then((data) => {
                    const timestamp = new Date(data.duedate);
                    const date = timestamp.toISOString().split("T")[0];
                    setDuedate(date);
                  });
                }}
              />
            </label>
            <br />
            <br />
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => {
                    setChecked(e.target.checked);
                    updateCard(
                      { ...card, completed: e.target.checked },
                      card.id
                    ).then((data) => setChecked(data.completed));
                  }}
                />
                complete
              </label>
            </div>
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
                    card.id
                  ).then((data) => setDescription(data.description));
                }}
                placeholder="Add a more detailed description..."
              ></textarea>
            </label>
            <br />
            <br />
            <div>
              <button
                className="del-card-btn"
                onClick={() => handleDeleteCard(card.id)}
              >
                Delete this card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
