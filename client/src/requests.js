const url = "http://localhost:3000";

export async function fetchBoards() {
  const res = await fetch(url + "/boards");
  const data = await res.json();
  return data;
}

export async function createBoard(title) {
  console.log("hi");
  const res = await fetch(url + "/boards", {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify(title),
  });
  const data = res.json();
  return data;
}
