require("dotenv").config();
import errorHandler from "./middleware/errorHandler";
import { default as todoRouter } from "./routes/todos";

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Enable JSON body parsing
app.use(errorHandler);

app.use("/todos", todoRouter);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
