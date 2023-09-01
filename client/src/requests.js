const url = "http://localhost:3000";

export async function fetchBoards() {
  const res = await fetch(url + "/boards");
  const data = await res.json();
  return data;
}

export async function fetchListsForBoard(boardId) {
  const res = await fetch(url + "/boards/" + boardId);

  if (res.status !== 200) return;

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

export async function updateBoard(title, boardId) {
  const res = await fetch(url + "/boards/" + boardId, {
    method: "PUT",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  return data;
}

export async function updateList(title, listId) {
  const res = await fetch(url + "/lists/" + listId, {
    method: "PUT",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  return data;
}

export async function updateCard(newCard, cardId) {
  const res = await fetch(url + "/cards/" + cardId, {
    method: "PUT",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify(newCard),
  });
  const data = await res.json();
  return data;
}

export async function deleteBoard(boardId) {
  const res = await fetch(url + "/boards/" + boardId, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
}

export async function deleteList(listId) {
  const res = await fetch(url + "/lists/" + listId, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
}

export async function deleteCard(cardId) {
  const res = await fetch(url + "/cards/" + cardId, {
    method: "DELETE",
  });

  if (res.status !== 200) return;

  const data = await res.json();
  return data;
}

export async function updateListsOrder(source_id, dest_id) {
  const res = await fetch(url + "/lists/updateOrder", {
    method: "PUT",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify({ source_id, dest_id }),
  });
  const data = await res.json();
  return data;
}

export async function updateCardsOrder(
  source_id,
  dest_id,
  source_list_id,
  dest_list_id
) {
  const res = await fetch(url + "/cards/updateOrder", {
    method: "PUT",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify({ source_id, dest_id, source_list_id, dest_list_id }),
  });
  const data = await res.json();
  return data;
}
