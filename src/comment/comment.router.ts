import { Router } from "express";

const RouterObj = require("express");

const router: Router = new RouterObj();

const commentController = require("./comment.controller");

router.post("/comment", commentController.createComment);
router.get("/comments/:post_id", commentController.getComments);
// router.delete("/comment", commentController.deletePost);

module.exports = router;
