const Guardian = require("../../models/Guardian/GuardianModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ✅ Register Guardian
const RegisterGuardian = async (req, res) => {
  try {
    const {
      studentId,
      name,
      relation,
      phone,
      email,
      address,
      occupation,
      password
    } = req.body;

    const existing = await Guardian.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newGuardian = new Guardian({
      studentId,
      name,
      relation,
      phone,
      email,
      address,
      occupation,
      password: hashedPassword,
    });

    await newGuardian.save();
    res.status(201).json({ message: "Guardian registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Login Guardian
const LoginGuardian = async (req, res) => {
  try {
    const { email, password } = req.body;

    const guardian = await Guardian.findOne({ email });
    if (!guardian) return res.status(404).json({ message: "Guardian not found" });

    const isMatch = await bcrypt.compare(password, guardian.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: guardian._id }, "secretkey", { expiresIn: "1d" });

    res.json({ message: "Login successful", token, guardian });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Update Password
const UpdatePasswordGuardian = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const guardian = await Guardian.findOne({ email });
    if (!guardian) return res.status(404).json({ message: "Guardian not found" });

    const isMatch = await bcrypt.compare(currentPassword, guardian.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect current password" });

    guardian.password = await bcrypt.hash(newPassword, 10);
    await guardian.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get All Guardians
const GetAllGuardians = async (req, res) => {
  try {
    const guardians = await Guardian.find().populate("studentId");
    res.json(guardians);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get Guardian By ID
const GetGuardianById = async (req, res) => {
  try {
    const guardian = await Guardian.findById(req.params.id).populate("studentId");
    if (!guardian) return res.status(404).json({ message: "Guardian not found" });
    res.json(guardian);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Update Guardian By ID
const UpdateGuardianById = async (req, res) => {
  try {
    const updated = await Guardian.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Guardian not found" });
    res.json({ message: "Guardian updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Delete Guardian By ID
const DeleteGuardianById = async (req, res) => {
  try {
    const deleted = await Guardian.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Guardian not found" });
    res.json({ message: "Guardian deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  RegisterGuardian,
  LoginGuardian,
  UpdatePasswordGuardian,
  GetAllGuardians,
  GetGuardianById,
  UpdateGuardianById,
  DeleteGuardianById
};
