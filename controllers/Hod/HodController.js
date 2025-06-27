const bcrypt = require("bcrypt");
const HodRegister = require("../../models/Hod/HodModel");

// ✅ Register HOD
const RegisterHOD = async (req, res) => {
  try {
    const { name, email, phone, password, department, designation, campus, reportingPrincipal } = req.body;

    const existing = await HodRegister.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newHod = new HodRegister({
      name,
      email,
      phone,
      password: hashedPassword,
      department,
      designation,
      campus,
      institutionType: "B.Tech College",
      reportingPrincipal,
    });

    await newHod.save();
    res.status(201).json({ message: "HOD registered successfully", hod: newHod });
  } catch (error) {
    console.error("RegisterHOD error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// ✅ Login HOD
const LoginHOD = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hod = await HodRegister.findOne({ email });
    if (!hod) return res.status(404).json({ message: "HOD not found" });

    const isMatch = await bcrypt.compare(password, hod.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", hod });
  } catch (error) {
    console.error("LoginHOD error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// ✅ Get All HODs
const GetAllHODs = async (req, res) => {
  try {
    const hods = await HodRegister.find().select("-password");
    res.status(200).json(hods);
  } catch (error) {
    console.error("GetAllHODs error:", error);
    res.status(500).json({ message: "Server error while fetching HODs" });
  }
};

// ✅ Get HOD by ID
const GetHODById = async (req, res) => {
  try {
    const hod = await HodRegister.findById(req.params.id).select("-password");
    if (!hod) return res.status(404).json({ message: "HOD not found" });

    res.status(200).json(hod);
  } catch (error) {
    console.error("GetHODById error:", error);
    res.status(500).json({ message: "Server error while fetching HOD" });
  }
};

// ✅ Update HOD by ID
const UpdateHODById = async (req, res) => {
  try {
    const { name, phone, department, designation, campus, status } = req.body;

    const hod = await HodRegister.findById(req.params.id);
    if (!hod) return res.status(404).json({ message: "HOD not found" });

    hod.name = name || hod.name;
    hod.phone = phone || hod.phone;
    hod.department = department || hod.department;
    hod.designation = designation || hod.designation;
    hod.campus = campus || hod.campus;
    hod.status = status || hod.status;

    await hod.save();
    res.status(200).json({ message: "HOD updated successfully", hod });
  } catch (error) {
    console.error("UpdateHODById error:", error);
    res.status(500).json({ message: "Server error while updating HOD" });
  }
};

// ✅ Delete HOD by ID
const DeleteHODById = async (req, res) => {
  try {
    const hod = await HodRegister.findByIdAndDelete(req.params.id);
    if (!hod) return res.status(404).json({ message: "HOD not found" });

    res.status(200).json({ message: "HOD deleted successfully" });
  } catch (error) {
    console.error("DeleteHODById error:", error);
    res.status(500).json({ message: "Server error while deleting HOD" });
  }
};

// ✅ Update Password
const UpdatePasswordHOD = async (req, res) => {
  try {
    const { email, newpassword } = req.body;

    const hod = await HodRegister.findOne({ email });
    if (!hod) return res.status(404).json({ message: "HOD not found" });

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    hod.password = hashedPassword;

    await hod.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("UpdatePasswordHOD error:", error);
    res.status(500).json({ message: "Server error while updating password" });
  }
};

module.exports = {
  RegisterHOD,
  LoginHOD,
  GetAllHODs,
  GetHODById,
  UpdateHODById,
  DeleteHODById,
  UpdatePasswordHOD,
};
