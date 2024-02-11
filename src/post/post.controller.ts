import { Request, Response } from "express";
import { IUser } from "./../../types/user";
import { Pool } from "pg";
import { joinQueryParams } from "../../helpers/index";

const db: Pool = require("../db");

class PostController {
  async createPost(req: Request, res: Response) {
    const { title, text, user_id } = req.body;
    const date = new Date();

    try {
      const { rows } = await db.query(
        `insert into uni.users_posts values (DEFAULT, $1, $2, $3, $4, DEFAULT, DEFAULT)`,
        [title, text, user_id, date]
      );

      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(422).json({ message: "Unprocessable Entity" });
    }
  }

  async getPosts(req: Request, res: Response) {
    const { title, page, user_id, likes, dislikes } = req.query;

    let offset = 0;

    let queryString = "";

    if (!Number.isNaN(parseInt(page as string))) {
      offset = (parseInt(page as string) - 1) * 5;
    }

    if (user_id || title || likes || dislikes) {
      queryString = "where ";

      const userIdQuery = user_id ? `user_id=${user_id}` : null;
      const titleQuery = title ? `title like '%${title}%'` : null;
      const likesQuery = likes ? `likes>=${likes}` : null;
      const dislikesQuery = dislikes ? `dislikes>=${dislikes}` : null;

      queryString += joinQueryParams([
        userIdQuery,
        titleQuery,
        likesQuery,
        dislikesQuery,
      ]);
    }

    try {
      const { rows } = await db.query(
        `select * from uni.users_posts ${queryString} limit 5 offset ${offset}`
      );

      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(400).json({ message: "error" });
    }
  }
}

module.exports = new PostController();
