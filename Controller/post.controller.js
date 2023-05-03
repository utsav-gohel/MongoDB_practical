const postModel = require("../Model/post.model");
const { ObjectId } = require("mongoose").Types;
const createPost = async (req, res) => {
  const { title, text, tags } = req.body;
  const userId = req.userId;
  console.log(userId);
  try {
    const data = await postModel.create({
      userId: userId,
      title: title,
      text: text,
      tags: tags,
    });
    res.status(200).json({
      message: "Post created Succesfully",
      post: await data,
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e });
  }
};

const getPost = async (req, res) => {
  const userId = req.userId;
  try {
    const data = await postModel.find({ userId }).populate("userId");
    res.status(200).json({
      message: "Post retrive Succesfully",
      post: await data,
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e });
  }
};
const getPostPerPage = async (req, res) => {
  const page = 1,
    limit = req.params.page,
    userId = req.userId;
  try {
    const posts = await postModel
      .find({ userId: userId })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    res.status(200).json({ posts });
  } catch (e) {
    res.status(404).json({ msg: e });
  }
};

const sortByField = async (req, res) => {
  const userId = req.userId;
  const data = await postModel
    .find(
      {
        userId,
      },
      ["text", "title", "tags"],
      {
        skip: 0,
        limit: 10,
        sort: {
          text: -1,
        },
      }
    )
    .collation({ locale: "en" });
  res.status(200).json({ data });
};

const SearchByKeyword = async (req, res) => {
  if (!req.body.keyword) {
    return res.status(404).json({ msg: "Enter correct keyword" });
  }
  try {
    const data = await postModel
      .find({ title: { $regex: req.body.keyword } })
      .populate("userId");
    res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e });
  }
};

const DisplayData = async (req, res) => {
  const userId = req.userId;
  try {
    const data = await postModel
      .find({ userId })
      .select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
      .populate("userId");

    res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e });
  }
};

const groupBy = async (req, res) => {
  const userId = new ObjectId(req.userId);
  try {
    const data = await postModel.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: "$tags",
          post: { $push: "$$ROOT" },
        },
      },
    ]);
    res.status(200).json({ data });
  } catch (e) {
    res.status(404).json({ message: e });
  }
};
module.exports = {
  createPost,
  getPost,
  getPostPerPage,
  SearchByKeyword,
  DisplayData,
  sortByField,
  groupBy,
};
