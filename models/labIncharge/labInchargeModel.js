const mongoose = require('mongoose');

const labInchargeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
  type: String,
  required: true,
},

  phone: {
    type: String,
  },
  department: {
    type: String,
    enum: ['CSE', 'AIML', 'AIDS'],
    required: true,
  },
  assignedLabs: [
    {
      type: String,
      required: true,
      enum: [
        // 1st Year Common Labs
        'Engineering Physics Lab',
        'Engineering Chemistry Lab',
        'Engineering Workshop',
        'Engineering Graphics Lab',
        'Basic Electrical/Electronics Lab',
        'English/Communication Skills Lab',
        'Programming for Problem Solving Lab',

        // CSE Labs
        'C Programming Lab',
        'Python Programming Lab',
        'Data Structures Lab',
        'Object-Oriented Programming Lab',
        'DBMS Lab',
        'OS Lab',
        'Computer Networks Lab',
        'Web Technologies Lab',
        'Compiler Design Lab',
        'Software Engineering Lab',
        'Mini Project Lab',
        'Major Project Lab',

        // AIML Labs
        'Machine Learning Lab',
        'Artificial Intelligence Lab',
        'Deep Learning Lab',
        'Natural Language Processing Lab',
        'Cloud Computing Lab',
        'AI Project Lab',

        // AIDS Labs
        'Data Science Lab',
        'Big Data Analytics Lab',
        'Statistics Lab',
        'Data Visualization Lab',
        'Data Mining Lab',
        'IoT & Smart Systems Lab'
      ],
    },
  ],
  designation: {
    type: String,
    default: 'Assistant Professor',
  },
  campus: {
    type: String,
    enum: ['A', 'B', 'C'],
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('LabIncharge', labInchargeSchema);
