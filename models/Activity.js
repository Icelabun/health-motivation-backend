const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['exercise', 'reading', 'nutrition', 'sleep']
  },
  duration: {
    type: Number,
    required: function() {
      return this.type === 'exercise' || this.type === 'reading';
    }
  },
  notes: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  mood: {
    type: String,
    enum: ['Great', 'Good', 'Okay', 'Tired', 'Exhausted']
  },
  waterIntake: {
    type: Number,
    required: function() {
      return this.type === 'nutrition';
    }
  },
  sleepHours: {
    type: Number,
    required: function() {
      return this.type === 'sleep';
    }
  },
  selectedActivities: [{
    type: String,
    enum: ['meditation', 'yoga', 'walking', 'cycling', 'swimming', 'gym']
  }]
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity; 