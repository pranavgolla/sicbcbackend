const mongoose = require("mongoose");

const subjectLists = {
  CSE: [
    "Data Structures and Algorithms",
    "Operating Systems",
    "Database Management Systems",
    "Computer Networks",
    "Software Engineering",
    "Object Oriented Programming",
    "Theory of Computation",
    "Compiler Design",
    "Artificial Intelligence",
    "Machine Learning",
    "Computer Architecture",
    "Web Technologies",
    "Cyber Security",
    "Cloud Computing",
    "Mobile App Development",
  ],
  AIML: [
    "Foundations of Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Computer Vision",
    "Data Structures and Algorithms",
    "Probability and Statistics",
    "Python Programming",
    "Reinforcement Learning",
    "Big Data Analytics",
    "Neural Networks",
    "Cloud and Edge Computing",
    "AI Ethics and Governance",
    "Robotic Process Automation",
    "Data Mining",
  ],
  AIDS: [
    "Data Science Fundamentals",
    "Statistics and Probability",
    "Machine Learning",
    "Data Visualization",
    "Data Mining",
    "Big Data Technologies",
    "Artificial Intelligence",
    "Deep Learning",
    "Python and R Programming",
    "Database Management Systems",
    "Cloud Computing",
    "Natural Language Processing",
    "Business Analytics",
    "Data Security and Privacy",
    "Time Series Analysis",
  ],
};

const professorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      enum: ["CSE", "AIML", "AIDS"],
      required: true,
    },

    designation: {
      type: String,
      enum: ["Assistant Professor", "Associate Professor", "Professor"],
      required: true,
    },

    subjects: {
      type: [String],
      validate: {
        validator: function (subjects) {
          return subjects.every((subject) =>
            subjectLists[this.department].includes(subject)
          );
        },
        message: "Subject(s) are invalid for the selected department",
      },
    },

    institutionType: {
      type: String,
      enum: ["B.Tech College"],
      default: "B.Tech College",
      required: true,
    },

    reportingHOD: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HodRegister",
    },

    campus: {
      type: String,
      enum: ["A", "B", "C"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const ProfessorRegister = mongoose.model("ProfessorRegister", professorSchema);
module.exports = ProfessorRegister;
