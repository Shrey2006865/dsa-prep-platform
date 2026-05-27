const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Progress = require('../models/Progress');
const Streak = require('../models/Streak');
const auth = require('../middleware/auth');

// Add a question
router.post('/add', auth, async (req, res) => {
  try {
    const { title, topic, difficulty, platform, notes, timeTaken } = req.body;

    const question = new Question({
      userId: req.userId,
      title,
      topic,
      difficulty,
      platform,
      notes,
      timeTaken
    });

    await question.save();

    // Update progress
    let progress = await Progress.findOne({ userId: req.userId, topic });
    if (!progress) {
      progress = new Progress({ userId: req.userId, topic });
    }
    progress.solved += 1;
    if (difficulty === 'Easy') progress.easyCount += 1;
    if (difficulty === 'Medium') progress.mediumCount += 1;
    if (difficulty === 'Hard') progress.hardCount += 1;
    progress.lastUpdated = Date.now();
    await progress.save();

    // Update streak
    let streak = await Streak.findOne({ userId: req.userId });
    if (!streak) {
      streak = new Streak({ userId: req.userId });
    }
    const today = new Date().toDateString();
    const lastActive = streak.lastActiveDate ? new Date(streak.lastActiveDate).toDateString() : null;

    if (lastActive !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastActive === yesterday.toDateString()) {
        streak.currentStreak += 1;
      } else {
        streak.currentStreak = 1;
      }
      if (streak.currentStreak > streak.longestStreak) {
        streak.longestStreak = streak.currentStreak;
      }
      streak.totalDaysActive += 1;
      streak.lastActiveDate = new Date();
    }
    await streak.save();

    res.status(201).json({ message: 'Question added successfully', question });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all questions for a user
router.get('/all', auth, async (req, res) => {
  try {
    const questions = await Question.find({ userId: req.userId }).sort({ solvedAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get questions by topic
router.get('/topic/:topic', auth, async (req, res) => {
  try {
    const questions = await Question.find({ userId: req.userId, topic: req.params.topic });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a question
router.delete('/:id', auth, async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;