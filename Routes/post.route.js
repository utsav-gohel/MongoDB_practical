const express = require("express");
const auth = require("../Middleware/auth");
const postRouter = express.Router();
const {
  createPost,
  getPost,
  getPostPerPage,
  SearchByKeyword,
  DisplayData,
  sortByField,
  groupBy,
} = require("../Controller/post.controller");

postRouter.post("/createPost", auth, createPost);

postRouter.get("/getPost", auth, getPost);
postRouter.get("/getPostPerPage/:page", auth, getPostPerPage);
postRouter.post("/SearchByKeyword", auth, SearchByKeyword);
postRouter.get("/DisplayData", auth, DisplayData);
postRouter.get("/sortByField", auth, sortByField);
postRouter.post("/groupBy", auth, groupBy);

module.exports = postRouter;
