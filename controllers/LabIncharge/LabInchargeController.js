const LabIncharge = require("../../models/labIncharge/labInchargeModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const RegisterLabIncharge = async (req, res) => {
  try {
    const { name, email, phone, department, assignedLabs, password, campus } = req.body;

    const existing = await LabIncharge.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newIncharge = new LabIncharge({
      name,
      email,
      phone,
      department,
      assignedLabs,
      campus,
      password: hashedPassword,
    });

    await newIncharge.save();
    res.status(201).json({ message: "Lab Incharge registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const LoginLabIncharge = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await LabIncharge.findOne({ email });
    if (!user) return res.status(404).json({ message: "Lab Incharge not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1d" });

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const UpdatePasswordLabIncharge = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const user = await LabIncharge.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: "Current password is incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const GetAllLabIncharges = async (req, res) => {
  try {
    const data = await LabIncharge.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const GetLabInchargeById = async (req, res) => {
  try {
    const data = await LabIncharge.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Lab Incharge not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const UpdateLabInchargeById = async (req, res) => {
  try {
    const updated = await LabIncharge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Lab Incharge not found" });
    res.json({ message: "Updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const DeleteLabInchargeById = async (req, res) => {
  try {
    const deleted = await LabIncharge.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Lab Incharge not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  RegisterLabIncharge,
  LoginLabIncharge,
  UpdatePasswordLabIncharge,
  GetAllLabIncharges,
  GetLabInchargeById,
  UpdateLabInchargeById,
  DeleteLabInchargeById,
};
