const bcrypt = require("bcrypt");
const ProfessorRegister = require("../../models/Professor/ProfessorModel");

// ✅ Register
const registerProfessor = async (req, res) => {
  try {
    const { name, email, phone, password, department, designation, subjects, campus, reportingHOD } = req.body;

    const existing = await ProfessorRegister.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const professor = new ProfessorRegister({
      name,
      email,
      phone,
      password: hashedPassword,
      department,
      designation,
      subjects,
      campus,
      reportingHOD,
      institutionType: "B.Tech College"
    });

    await professor.save();
    res.status(201).json({ message: "Professor registered successfully", professor });
  } catch (error) {
    console.error("registerProfessor error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// ✅ Login
const loginProfessor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const prof = await ProfessorRegister.findOne({ email });
    if (!prof) return res.status(404).json({ message: "Professor not found" });

    const isMatch = await bcrypt.compare(password, prof.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", professor: prof });
  } catch (error) {
    console.error("loginProfessor error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// ✅ Get All
const getAllProfessors = async (req, res) => {
  try {
    const list = await ProfessorRegister.find().select("-password");
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch professors" });
  }
};

// ✅ Get by ID
const getProfessorById = async (req, res) => {
  try {
    const prof = await ProfessorRegister.findById(req.params.id).select("-password");
    if (!prof) return res.status(404).json({ message: "Professor not found" });
    res.status(200).json(prof);
  } catch (error) {
    res.status(500).json({ message: "Error fetching professor" });
  }
};

// ✅ Update by ID
const updateProfessorById = async (req, res) => {
  try {
    const updates = req.body;
    const prof = await ProfessorRegister.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!prof) return res.status(404).json({ message: "Professor not found" });
    res.status(200).json({ message: "Professor updated", professor: prof });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// ✅ Delete by ID
const deleteProfessorById = async (req, res) => {
  try {
    const prof = await ProfessorRegister.findByIdAndDelete(req.params.id);
    if (!prof) return res.status(404).json({ message: "Professor not found" });
    res.status(200).json({ message: "Professor deleted" });
  } catch (error) {
    res.status(500).json({ message: "Deletion failed" });
  }
};

// ✅ Update Password
const updatePasswordProfessor = async (req, res) => {
  try {
    const { email, newpassword } = req.body;
    const prof = await ProfessorRegister.findOne({ email });
    if (!prof) return res.status(404).json({ message: "Professor not found" });

    prof.password = await bcrypt.hash(newpassword, 10);
    await prof.save();
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ message: "Password update failed" });
  }
};

module.exports = {
  registerProfessor,
  loginProfessor,
  getAllProfessors,
  getProfessorById,
  updateProfessorById,
  deleteProfessorById,
  updatePasswordProfessor,
};
