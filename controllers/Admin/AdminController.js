const bcrypt = require("bcrypt");
const AdminRegister = require("../../models/Admin/AdminModel");

// Create new admin
const CreateAdminRegisterSICBC = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    const existingUser = await AdminRegister.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const register = new AdminRegister({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    await register.save();

    res.status(201).json(register);
  } catch (error) {
    console.log(`Error in CreateAdminRegisterSICBC: ${error}`);
    res.status(500).json({ message: "Admin Server error" });
  }
};

// Update admin password
const UpdatePasswordAdminSICBC = async (req, res) => {
  try {
    const { email, newpassword } = req.body;

    const existingUser = await AdminRegister.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    existingUser.password = hashedPassword;

    await existingUser.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(`Error in UpdatePasswordAdminSICBC: ${error}`);
    res.status(500).json({ message: "Server error while updating password" });
  }
};

// Login admin
const LoginAdminSICBC = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminRegister.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    console.log(`Error in LoginAdminSICBC: ${error}`);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Get admin(s)
const GetAdminSICBC = async (req, res) => {
  try {
    const { email } = req.query;

    if (email) {
      const admin = await AdminRegister.findOne({ email }).select("-password");
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      return res.status(200).json(admin);
    }

    const admins = await AdminRegister.find().select("-password");
    res.status(200).json(admins);
  } catch (error) {
    console.log(`Error in GetAdminSICBC: ${error}`);
    res.status(500).json({ message: "Server error while fetching admins" });
  }
};

// Get admin by ID
const GetAdminByIdSICBC = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await AdminRegister.findById(id).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.log(`Error in GetAdminByIdSICBC: ${error}`);
    res.status(500).json({ message: "Server error while fetching admin by ID" });
  }
};

// Delete admin by ID
const DeleteAdminByIdSICBC = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAdmin = await AdminRegister.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.log(`Error in DeleteAdminByIdSICBC: ${error}`);
    res.status(500).json({ message: "Server error while deleting admin" });
  }
};

// Update admin by ID
const UpdateAdminByIdSICBC = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email } = req.body;

    const updatedAdmin = await AdminRegister.findByIdAndUpdate(
      id,
      { name, phone, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin updated successfully", admin: updatedAdmin });
  } catch (error) {
    console.log(`Error in UpdateAdminByIdSICBC: ${error}`);
    res.status(500).json({ message: "Server error while updating admin" });
  }
};

module.exports = {
  CreateAdminRegisterSICBC,
  UpdatePasswordAdminSICBC,
  LoginAdminSICBC,
  GetAdminSICBC,
  GetAdminByIdSICBC,
  DeleteAdminByIdSICBC,
  UpdateAdminByIdSICBC,
};

