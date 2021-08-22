const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  header: {
    type: String,
    maxlength: 100,
    minlength: 1,
    required: true,
    default: 'Очень важное дело'
  },
  description: {
    type: String,
    default: 'без описания'
  },
  priority: {
    type: String,
    maxlength: 1,
    minlength: 1,
    required: true,
    default: 'l',
  },
  date: {
    type: String,
    required: true,
    default: new Date().toISOString().slice(0,10),
  },
  done: {
    type: Boolean,
    required: true,
    default: false,
  }
});

module.exports = mongoose.model('task', taskSchema);
