import { useEffect, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "../utils/dragDrop";
import Card from "./Card";
import AddNewCard from "./AddNewCard";
import "./List.css";
import { createCard, deleteCard, updateList } from "../requests";

export default function List({ list }) {
  const [cards, setCards] = useState([]);
  const [cardTitle, setCardTitle] = useState("");
  const [listName, setListName] = useState(list.title);

  useEffect(() => {
    setCards(list.cards);
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
      setCards((currentCards) => {
        if (currentCards) return [...currentCards, { ...data }];
        return [{ ...data }];
      });
    });
  }

  function handleCreateCard() {
    if (cardTitle.trim() === "") return;
    addCard(cardTitle);
    setCardTitle("");
  }

  function handleDeleteCard(cardId) {
    deleteCard(cardId).then(() =>
      setCards((cards) => cards.filter((card) => card.id !== cardId))
    );
  }

  function onCardDrop(dropResult) {
    let newCards = [...cards];
    newCards = applyDrag(newCards, dropResult);
    setCards(newCards);
  }

  return (
    <div className="list-box">
      <div className="add-list-title">
        <div>
          <input
            value={listName}
            onChange={(e) =>
              updateList({ ...list, title: e.target.value }, list.id).then(
                (data) => {
                  setListName(data.title);
                }
              )
            }
          ></input>
        </div>
      </div>
      <div>
        <Container
          onDrop={onCardDrop}
          dragHandleSelector=".add-card-title"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "cards-drop-preview",
          }}
        >
          {cards === undefined
            ? ""
            : cards
                .filter((card) => {
                  if (card !== null) return card.list_id === list.id;
                })
                .map((card) => {
                  return (
                    <Draggable key={card.id}>
                      <Card
                        list={list}
                        card={card}
                        handleDeleteCard={handleDeleteCard}
                      />
                    </Draggable>
                  );
                })}
        </Container>
      </div>
      <AddNewCard
        cardTitle={cardTitle}
        setCardTitle={setCardTitle}
        handleCreateCard={handleCreateCard}
      />
    </div>
  );
}
