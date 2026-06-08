const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  topic: {
    type: String,
    required: true,
    enum: ['Arrays', 'Linked List', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching', 'Stacks', 'Queues', 'Strings', 'Math', 'Other']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  platform: {
    type: String,
    enum: ['LeetCode', 'HackerRank', 'CodeForces', 'GeeksForGeeks', 'Other'],
    default: 'LeetCode'
  },
  notes: {
    type: String,
    default: ''
  },
  timeTaken: {
    type: Number,
    default: 0
  },
  solvedAt: {
    type: Date,
    default: Date.now
  },

  revisionCount: {
    type: Number,
    default: 0
  },

  nextRevisionDate: {
    type: Date,
    default: function () {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    }
  }
});

module.exports = mongoose.model('Question', questionSchema);