const express = require("express");
const auth = require("../Middleware/auth");
const postCommentRouter = express.Router();
const { postComment, getComment } = require("../Controller/comment.controller");

postCommentRouter.post("/postComment", auth, postComment);
postCommentRouter.post("/getComment", auth, getComment);

module.exports = postCommentRouter;
