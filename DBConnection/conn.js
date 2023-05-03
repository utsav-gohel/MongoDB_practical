const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const DBconnections = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Db connected");
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = DBconnections;
