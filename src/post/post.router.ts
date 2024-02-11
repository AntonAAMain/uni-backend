import { Router } from "express";

const RouterObj = require("express");

const router: Router = new RouterObj();

const postController = require("./post.controller");

router.post("/profile/post", postController.createPost);
router.get("/profile/posts", postController.getPosts);

module.exports = router;
