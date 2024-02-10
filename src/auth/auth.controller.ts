import { IUser } from "./../../types/user";
import { Request, Response } from "express";
import { Pool } from "pg";

const db: Pool = require("../db");

class AuthController {
  async createUser(req: Request, res: Response) {
    const { name, password } = req.body;

    const duplicateNames = await db.query(
      `SELECT * FROM uni.users WHERE name='${name}'`
    );

    const isUniqueName = duplicateNames.rows.length === 0;

    if (isUniqueName) {
      const currentData = new Date();

      await db.query(`INSERT INTO uni.users VALUES (DEFAULT, $1, $2, $3)`, [
        name,
        password,
        currentData,
      ]);

      res.status(200).json({ message: "success" });
    } else {
      res.status(409).json({ message: "NAME_ALREADY_EXTISTS" });
    }
  }

  async login(req: Request, res: Response) {
    const { name, password } = req.body;

    const { rows } = await db.query(
      "select * from uni.users where name=$1 and password=$2",
      [name, password]
    );

    const foundUsers: IUser[] = rows;

    const isCorrectData = foundUsers.length === 1;

    if (isCorrectData) {
      res.status(200).json({ message: "success", id: foundUsers[0].id });
    } else {
      res.status(404).json({ message: "NOT_FOUND" });
    }
  }
}

module.exports = new AuthController();
