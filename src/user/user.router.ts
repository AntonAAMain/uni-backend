import { Router } from "express";

const RouterObj = require("express");

const router: Router = new RouterObj();

const userController = require("./user.controller");

router.get("/user/info/:id", userController.getUserInfo);

module.exports = router;
