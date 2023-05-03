const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("comment", CommentSchema);
