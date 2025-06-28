const Student = require("../../models/Student/StudentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
const RegisterStudent = async (req, res) => {
  try {
    const { name, email, phone, gender, branch, year, section, campus, rollNumber, password } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      email,
      phone,
      gender,
      branch,
      year,
      section,
      campus,
      rollNumber,
      password: hashedPassword,
    });

    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login
const LoginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: student._id }, "secretkey", { expiresIn: "1d" });

    res.json({ message: "Login successful", token, student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Password
const UpdatePasswordStudent = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const isMatch = await bcrypt.compare(currentPassword, student.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect current password" });

    student.password = await bcrypt.hash(newPassword, 10);
    await student.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Students
const GetAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Student By ID
const GetStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Student By ID
const UpdateStudentById = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Student By ID
const DeleteStudentById = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  RegisterStudent,
  LoginStudent,
  UpdatePasswordStudent,
  GetAllStudents,
  GetStudentById,
  UpdateStudentById,
  DeleteStudentById,
};
