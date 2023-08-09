import express from "express";
import trelloRouter from "./routes/trelloRoutes.js";
const app = express();

const port = 3000;

function error(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.send("Internal server error");
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
