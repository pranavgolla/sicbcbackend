const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  branch: {
    type: String,
    enum: ['CSE', 'AIML', 'AIDS'],
    required: true,
  },
  year: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },
  section: {
    type: String,
    enum: ['A', 'B', 'C','D','E'], // Add more sections if needed
  },
  campus: {
    type: String,
    enum: ['A', 'B', 'C'],
    required: true,
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Student', studentSchema);
