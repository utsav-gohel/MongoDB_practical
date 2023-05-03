const commentModel = require("../Model/comment.model");

const postComment = async (req, res) => {
  const { text, postId } = req.body;
  const userId = req.userId;
  console.log(userId);
  try {
    const data = await commentModel.create({
      userId: userId,
      postId: postId,
      text: text,
    });
    res.status(200).json({
      message: "Comment created Succesfully",
      user: await data,
      // token: token,
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e });
  }
};

const getComment = async (req, res) => {
  const userId = req.userId;
  try {
    const data = await commentModel
      .find({ userId })
      .populate("postId")
      .populate("userId");
    res.status(200).json({
      message: "Comment retrive Succesfully",
      user: await data,
    });
  } catch (e) {
    res.status(404).json({ message: e });
  }
};
module.exports = { postComment, getComment };
