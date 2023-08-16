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

export async function fetchCardsForList() {
  const res = await fetch(url + "/cards");
  const data = await res.json();
  // console.log("data=", data);
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

export async function createList(title) {
  const res = await fetch(url + "/lists", {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  return data;
}

export async function createCard(title) {
  const res = await fetch(url + "/cards", {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  return data;
}
