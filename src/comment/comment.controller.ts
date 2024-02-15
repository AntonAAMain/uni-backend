import { Request, Response } from "express";
import { IUser } from "../../types/user";
import { Pool } from "pg";
import { joinQueryParams } from "../../helpers/index";

const db: Pool = require("../db");

class CommentController {
  async createComment(req: Request, res: Response) {
    const userId = req.body.userId;
    const text = req.body.text;
    const userName = req.body.userName;
    const postId = req.body.postId;

    try {
      const { rows } = await db.query(
        `select * from uni.users where id=${userId}`
      );

      await db.query(
        `insert into uni.posts_comments values ($1, DEFAULT, $2, $3, $4)`,
        [userId, text, postId, rows[0].name]
      );

      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(402).json({ message: error });
    }
  }

  async getComments(req: Request, res: Response) {
    const postId = req.params.post_id;

    try {
      const { rows } = await db.query(
        `select * from uni.posts_comments where post_id=${postId}`
      );

      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(400).json(error);
    }
  }

  // async deleteComment(req: Request, res: Response) {
  //   const postId = req.params.post_id;

  //   try {
  //     const { rows } = await db.query(
  //       `delete from uni.posts_comments where post_id=${postId}`
  //     );

  //     res.status(200).json({ data: rows });
  //   } catch (error) {
  //     res.status(400).json(error);
  //   }
  // }
}

module.exports = new CommentController();
