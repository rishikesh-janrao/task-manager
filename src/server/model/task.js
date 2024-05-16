const mongoose = require("mongoose");
const commentSchema = require("./comment");

const taskSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: Date.now,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  comments: {
    type: [commentSchema],
    default: [],
    required: false,
  },
});
const task = new mongoose.model("Task", taskSchema);
module.exports =  task
