import { Request, Response } from "express";
import { IUser } from "./../../types/user";
import { Pool } from "pg";
import { joinQueryParams } from "../../helpers/index";

const db: Pool = require("../db");

class PostController {
  async getUserInfo(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      const { rows } = await db.query(
        `select * from uni.users where id=${userId}`
      );

      const { rows: rowsPosts } = await db.query(
        `select * from uni.users_posts where user_id=${userId}`
      );

      const userInfo = rows[0];

      res.status(200).json({ data: userInfo, posts: rowsPosts.length });
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = new PostController();
