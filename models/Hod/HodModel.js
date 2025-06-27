const mongoose = require("mongoose");

const hodSchema = new mongoose.Schema(
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
      enum: ["CSE", "AIDS", "AIML"],
      required: true,
    },

    designation: {
      type: String,
      enum: ["HOD", "Senior HOD"],
      default: "HOD",
    },

    institutionType: {
      type: String,
      enum: ["B.Tech College"],
      default: "B.Tech College",
      required: true,
    },

    reportingPrincipal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PrincipalRegister",
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

const HodRegister = mongoose.model("HodRegister", hodSchema);
module.exports = HodRegister;
