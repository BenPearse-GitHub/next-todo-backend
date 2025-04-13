import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todoController";

const express = require("express");
const router = express.Router();

// Routes
router.get("/", getAllTodos);

router.post("/", createTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

export default router;
