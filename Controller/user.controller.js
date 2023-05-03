const userModel = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const SECRET_KEY = process.env.SECRET_KEY;
const expiresIn = process.env.JWT_EXPIRES_IN;

const SignUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(200).json({ msg: "User Already Exist" });
    }
    const hashPwd = await bcrypt.hash(password, 10);
    const data = userModel.create({
      name: name,
      email: email,
      password: hashPwd,
    });
    const token = jwt.sign({ email: data.email, id: data._id }, SECRET_KEY, {
      expiresIn,
    });
    res.status(200).json({
      message: "SignUp Succesfully",
      user: await data,
      token: token,
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await userModel.findOne({ email: email });
  if (!existingUser) {
    return res.status(404).json({ msg: "User not exist" });
  }
  const matchPwd = await bcrypt.compare(password, existingUser.password);
  if (!matchPwd) {
    return res.status(404).json({ msg: "Enter correct password" });
  }
  const token = await jwt.sign(
    { email: existingUser.email, id: existingUser.id },
    SECRET_KEY,
    {
      expiresIn,
    }
  );
  res.status(200).json({
    message: "SignIn Succesfully",
    user: existingUser,
    token: token,
  });
};

const getUserWithPost = async (req, res) => {
  const data = await userModel.aggregate([
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "userId",
        as: "post",
      },
    },
  ]);
  res.status(200).json({ data });
};
module.exports = { SignUp, signIn, getUserWithPost };
