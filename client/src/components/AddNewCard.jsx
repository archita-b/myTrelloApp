import { useState } from "react";
import "./AddNewCard.css";

export default function AddNewCard({
  cardTitle,
  setCardTitle,
  handleCreateCard,
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="add-new-item">
      <button className="newitem-btn" onClick={() => setIsFormOpen(true)}>
        + Add Card
      </button>
      {isFormOpen && (
        <form className="addcard-form" onSubmit={(e) => e.preventDefault()}>
          <textarea
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            placeholder="Enter a title for this card..."
          ></textarea>
          <div>
            <button className="add-btn" onClick={handleCreateCard}>
              Add Card
            </button>
            <button className="cross-btn" onClick={() => setIsFormOpen(false)}>
              {"\u00d7"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
