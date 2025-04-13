const express = require("express");
import { Request, Response } from "express";
const router = express.Router();
import { pool } from "../db/index";

// Routes
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM todos;");
    res.json(result.rows);
  } catch (err) {
    console.error("Database query error", err);
    res.status(500).send("Internal server error");
  }
});

router.post("/", async (req: Request, res: Response) => {
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

router.put("/:id", async (req: Request, res: Response) => {
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

router.delete("/:id", async (req: Request, res: Response) => {
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

export default router;
