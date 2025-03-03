import { Request, Response } from "express";
import { IToDoItem } from "./types/todo";

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON body parsing

const todos: IToDoItem[] = []; // Temporary storage

// Routes
app.get("/todos", (req: Request, res: Response) => {
  res.json(todos);
});

app.post("/todos", (req: Request, res: Response) => {
  const todo = {
    id: crypto.randomUUID(),
    name: req.body.name,
    complete: false,
  };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put("/todos/:id", (req: Request, res: Response) => {
  const todo = todos.find((t) => t.id == req.params.id);
  if (todo) {
    todo.name = req.body.name;
    todo.complete = req.body.complete;
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

app.delete("/todos/:id", (req: Request, res: Response) => {
  const index = todos.findIndex((t) => t.id == req.params.id);
  if (index !== -1) {
    todos.splice(index, 1);
    res.json({ message: "Todo deleted" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

app.listen(5001, () => console.log("Server running on port 5001"));
