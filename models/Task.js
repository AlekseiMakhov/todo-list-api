const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  header: {
    type: String,
    maxlength: 100,
    minlength: 1,
    required: true,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    maxlength: 1,
    minlength: 1,
    required: true,
    default: 'l',
  },
  date: {
    type: Date,
    required: true,
    default: new Date().toISOString().slice(0,10),
  },
});

module.exports = mongoose.model('task', taskSchema);
