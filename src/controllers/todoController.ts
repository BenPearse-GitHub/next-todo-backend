import { Request, Response } from "express";
import { pool } from "../db/index";

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM todos;");
    res.json(result.rows);
  } catch (err) {
    console.error("Database query error", err);
    res.status(500).send("Internal server error");
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `INSERT INTO todos (id, name, complete) VALUES (uuid_generate_v4(), $1, false);`,
      [req.body.name]
    );
    res.status(201).json(result.rows);
  } catch (err) {
    console.error("Database query error", err);
    res.status(500).send("Internal server error");
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `UPDATE todos SET name = $1, complete = $2 WHERE id = $3;`,
      [req.body.name, req.body.complete, req.params.id]
    );
    res.status(201).json(result.rows);
  } catch (err) {
    console.error("Database query error", err);
    res.status(500).send("Internal server error");
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM todos WHERE id = $1;`, [
      req.params.id,
    ]);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    console.error("Database query error", err);
    res.status(500).send("Internal server error");
  }
};
