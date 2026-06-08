const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Progress = require('../models/Progress');
const Streak = require('../models/Streak');
const auth = require('../middleware/auth');

// Add a question
router.post('/add', auth, async (req, res) => {
  try {
    const { title, topic, difficulty, platform, notes, timeTaken, revisionCount, nextRevisionDate } = req.body;

    const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const question = new Question({
  userId: req.userId,
  title,
  topic,
  difficulty,
  platform,
  notes,
  timeTaken,
  revisionCount: 0,
  nextRevisionDate: tomorrow
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
// Update a question
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, topic, difficulty, platform, notes } = req.body;

    const question = await Question.findByIdAndUpdate(
      req.params.id,
      {
        title,
        topic,
        difficulty,
        platform,
        notes
      },
      { new: true }
    );

    res.json({
      message: 'Question updated successfully',
      question
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
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
// Get questions due for revision
router.get('/revision-due', auth, async (req, res) => {
  try {
    const today = new Date();

    

const questions = await Question.find({
  userId: req.userId,
  nextRevisionDate: { $lte: today }
}).sort({ nextRevisionDate: 1 });

    

    res.json(questions);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});
// Mark question as revised
router.put('/revise/:id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: 'Question not found'
      });
    }

    question.revisionCount += 1;

    const intervals = [1, 3, 7, 15, 30];
    const days =
      intervals[Math.min(question.revisionCount - 1, intervals.length - 1)];

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + days);

    question.nextRevisionDate = nextDate;

    await question.save();

    res.json({
      message: 'Revision updated successfully',
      question
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;