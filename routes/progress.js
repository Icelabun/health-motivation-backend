const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Progress Schema
const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  },
  notes: String,
  duration: Number, // in minutes
  caloriesBurned: Number
});

const Progress = mongoose.model('Progress', progressSchema);

// Get all progress entries for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.params.userId })
      .populate('activityId')
      .sort({ date: -1 });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new progress entry
router.post('/', async (req, res) => {
  const progress = new Progress({
    userId: req.body.userId,
    activityId: req.body.activityId,
    completed: req.body.completed,
    notes: req.body.notes,
    duration: req.body.duration,
    caloriesBurned: req.body.caloriesBurned
  });

  try {
    const newProgress = await progress.save();
    res.status(201).json(newProgress);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a progress entry
router.patch('/:id', async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    if (!progress) {
      return res.status(404).json({ message: 'Progress entry not found' });
    }

    Object.keys(req.body).forEach(key => {
      progress[key] = req.body[key];
    });

    const updatedProgress = await progress.save();
    res.json(updatedProgress);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a progress entry
router.delete('/:id', async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    if (!progress) {
      return res.status(404).json({ message: 'Progress entry not found' });
    }

    await progress.deleteOne();
    res.json({ message: 'Progress entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 