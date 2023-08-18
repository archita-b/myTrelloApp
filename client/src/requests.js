const url = "http://localhost:3000";

export async function fetchBoards() {
  const res = await fetch(url + "/boards");
  const data = await res.json();
  return data;
}

export async function fetchListsForBoard(boardId) {
  const res = await fetch(url + "/boards/" + boardId + "/lists");
  const data = await res.json();
  return data;
}

export async function fetchCardsForList(listId) {
  const res = await fetch(url + "/lists/" + listId + "/cards");
  const data = await res.json();
  return data;
}

export async function createBoard(title) {
  const res = await fetch(url + "/boards", {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  return data;
}

export async function createList(title, boardId) {
  const res = await fetch(url + "/boards/" + boardId + "/lists", {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  return data;
}

export async function createCard(newCard, listId) {
  const res = await fetch(url + "/lists/" + listId + "/cards", {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify(newCard),
  });
  const data = await res.json();
  return data;
}
