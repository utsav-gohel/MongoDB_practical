const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    tags: {
      type: Array,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("post", PostSchema);
