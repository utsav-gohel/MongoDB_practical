const express = require("express");
const bodyparser = require("body-parser");
const app = express();
require("./DBConnection/conn");
const userRoute = require("./Routes/user.route");
const postRoute = require("./Routes/post.route");
const postCommentRouter = require("./Routes/comment.route");

app.use(express.json());
app.use(bodyparser.json());
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/post", postCommentRouter);
app.listen(3000, () => {
  console.log("Server Started");
});
