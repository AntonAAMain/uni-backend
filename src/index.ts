import { Request, Response } from "express";

const express = require("express");
const { pool } = require("./db");
const cors = require("cors");

const authRouter = require("./auth/auth.router");
const postRouter = require("./post/post.router");

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(postRouter);

app.get("/", (req: Request, res: Response) => {
  res.json("hello");
});

app.listen(PORT, async () => {
  //   const client = await pool.connect();
  //   pool.query("insert into uni.test values ('first')");
  console.log("пошла шарманка на ", PORT);
});
