const mongoose = require("mongoose");

const principalSchema = new mongoose.Schema(
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

    institutionType: {
      type: String,
      enum: ["School", "Inter College", "B.Tech College"],
      required: true,
    },

    designation: {
      type: String,
      enum: ["Principal", "Director"],
      default: "Principal",
    },

    department: {
      type: String,
      default: "Administration",
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

const PrincipalRegister = mongoose.model("PrincipalRegister", principalSchema);
module.exports = PrincipalRegister;
