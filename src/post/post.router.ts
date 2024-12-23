import { Router } from "express";

const RouterObj = require("express");

const router: Router = new RouterObj();

const postController = require("./post.controller");

router.post("/profile/post", postController.createPost);
router.get("/profile/posts", postController.getPosts);
router.post("/post/rate", postController.ratePost);
router.patch("/profile/post/update", postController.changePost);
router.post("/profile/post/delete", postController.deletePost);

module.exports = router;
