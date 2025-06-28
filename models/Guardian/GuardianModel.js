const mongoose = require("mongoose");

const guardianSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  relation: {
    type: String,
    enum: ["Father", "Mother", "Guardian", "Other"],
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  occupation: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("Guardian", guardianSchema);
