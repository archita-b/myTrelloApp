import { useEffect, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "../utils/dragDrop";
import { createCard, fetchCardsForList } from "../requests";
import { updateCard } from "../requests";

export default function Card({ list, cards, setCards }) {
  const [cardTitle, setCardTitle] = useState("");
  const [displayForm, setDisplayForm] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [poppedCardID, setPoppedCardID] = useState(null);

  useEffect(() => {
    if (list !== null) {
      fetchCardsForList().then((data) => {
        setCards(data);
      });
    }
  }, [list]);

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

  function handleCreateCard() {
    if (cardTitle.trim() === "") return;
    addCard(cardTitle);
    setCardTitle("");
  }

  function onCardDrop(dropResult) {
    let newCards = [...cards];
    newCards = applyDrag(newCards, dropResult);
    setCards(newCards);
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="card-container">
      <Container
        onDrop={onCardDrop}
        dragHandleSelector=".list-box"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "cards-drop-preview",
        }}
      >
        {cards
          .filter((card) => card.listid === list.id)
          .map((card) => {
            return (
              <Draggable key={card.cardid}>
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
                              setCardTitle(e.target.value);
                              updateCard(
                                {
                                  ...card,
                                  cardtitle: e.target.value,
                                },
                                card.listid,
                                card.cardid
                              );
                            }}
                          />
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
                        <input type="date" value={card.duedate} min={today} />
                      </label>
                      <br />
                      <br />
                      <label>
                        <input type="checkbox" checked={card.completed} />
                        completed
                      </label>
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
              </Draggable>
            );
          })}
      </Container>

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
