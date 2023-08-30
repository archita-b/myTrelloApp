import { useEffect, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "../utils/dragDrop";
import Card from "./Card";
import AddNewCard from "./AddNewCard";
import "./List.css";
import { createCard, deleteCard, updateList } from "../requests";

export default function List({ list, handleDeleteList }) {
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
      setCards((currentCards) =>
        currentCards === undefined
          ? [{ ...data }]
          : [...currentCards, { ...data }]
      );
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
      <div className="list-title">
        {/* <div> */}
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
        <button
          className="del-list-btn"
          onClick={() => handleDeleteList(list.id)}
        >
          {"\u00d7"}
        </button>
        {/* </div> */}
      </div>
      <div>
        <Container
          groupName="list"
          onDrop={onCardDrop}
          getChildPayload={(index) => cards[index]}
          dragHandleSelector=".add-card-title"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "cards-drop-preview",
          }}
        >
          {cards === undefined
            ? []
            : cards.map((card) => {
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
