const Comment = require("../models/commentSchema");

const getComments = async (req, res) => {
  const comments = await Comment.find({ booking: req.params.bookingId }) // ✅ FIXED
    .populate("user", "-password")
    .populate("booking");

  res.status(200).json(comments);
};


const addComments = async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please give a text");
  }

  const newComment = await Comment.create({
    user: req.user._id,
    booking: req.params.bookingId, // ✅ FIXED
    text: req.body.text,
    isAdmin: req.body.isAdmin,
  });

  if (!newComment) {
    res.status(400);
    throw new Error("Comment not added");
  }

  const comment = await Comment.findById(newComment._id)
    .populate("user", "-password")
    .populate("booking");

  res.status(201).json(comment);
};


module.exports = { getComments, addComments };
