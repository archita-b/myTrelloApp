import express from "express";
import cors from "cors";
import boardsRouter from "./routes/boards.js";
import listsRouter from "./routes/lists.js";
import cardsRouter from "./routes/cards.js";
const app = express();

const port = process.env.PORT || 3000;

app.use(cors("http://localhost:5173"));
app.use(express.json());

app.use("/boards", boardsRouter);
app.use("/lists", listsRouter);
app.use("/cards", cardsRouter);

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log("Error connecting to server", error);
  }
});
