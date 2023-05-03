const express = require("express");
const userRouter = express.Router();
const {
  SignUp,
  signIn,
  getUserWithPost,
} = require("../Controller/user.controller");

// userRouter.get("/signup/:id", getUser);
userRouter.post("/signup", SignUp);

userRouter.post("/signin", signIn);
userRouter.get("/getUserWithPost", getUserWithPost);

module.exports = userRouter;
