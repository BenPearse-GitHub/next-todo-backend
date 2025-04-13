require("dotenv").config();
import { Request, Response } from "express";

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
import { pool } from "./db/index";

app.use(cors());
app.use(express.json()); // Enable JSON body parsing

// Routes
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM todos;");
    res.json(result.rows);
  } catch (err) {
    console.error("Database query error", err);
    res.status(500).send("Internal server error");
  }
});

app.post("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `INSERT INTO todos (id, name, complete) VALUES (uuid_generate_v4(), '${req.body.name}', false);`
    );
    res.status(201).json(result.rows);
  } catch (err) {
    console.error("Database query error", err);
    res.status(500).send("Internal server error");
  }
});

app.put("/todos/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `UPDATE todos SET name = '${req.body.name}', complete = ${req.body.complete} WHERE id = '${req.params.id}';`
    );
    res.status(201).json(result.rows);
  } catch (err) {
    console.error("Database query error", err);
    res.status(500).send("Internal server error");
  }
});

app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `DELETE FROM todos WHERE id = '${req.params.id}';`
    );
    res.json({ message: "Todo deleted" });
  } catch (err) {
    console.error("Database query error", err);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
