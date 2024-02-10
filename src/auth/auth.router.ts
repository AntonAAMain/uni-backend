import { Router } from "express";

const RouterObj = require("express");

const router: Router = new RouterObj();

const authController = require("./auth.controller");

router.post("/register", authController.createUser);
router.post("/login", authController.login);

module.exports = router;
