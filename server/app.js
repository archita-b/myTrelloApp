import express from "express";
import cors from "cors";
import trelloRouter from "./routes/trelloRoutes.js";
const app = express();

const port = 3000;

app.use(cors("http://localhost:5173"));
app.use(express.json());

function error(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.json({ message: "Internal server error" });
}

app.use("/", trelloRouter);

app.use(error);

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log("Error connecting to server", error);
  }
});
