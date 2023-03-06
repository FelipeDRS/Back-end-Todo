const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {
  title: String,
  id: Number,
  isCompleted: Boolean,
});

module.exports = Todo;
