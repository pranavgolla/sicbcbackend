const bcrypt = require("bcrypt");
const PrincipalRegister = require("../../models/Principal/PrincipalModel");

// CREATE: Admin creates a principal
const CreatePrincipalSICBC = async (req, res) => {
  try {
    const { name, email, phone, password, institutionType, designation, department, campus } = req.body;

    const existing = await PrincipalRegister.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPrincipal = new PrincipalRegister({
      name,
      email,
      phone,
      password: hashedPassword,
      institutionType,
      designation,
      department,
      campus,
    });

    await newPrincipal.save();

    res.status(201).json({ message: "Principal created successfully", principal: newPrincipal });
  } catch (error) {
    console.error("Error creating principal:", error);
    res.status(500).json({ message: "Server error while creating principal" });
  }
};

// READ ALL
const GetAllPrincipalsSICBC = async (req, res) => {
  try {
    const principals = await PrincipalRegister.find().select("-password");
    res.status(200).json(principals);
  } catch (error) {
    console.error("Error fetching principals:", error);
    res.status(500).json({ message: "Server error while fetching principals" });
  }
};

// READ ONE by ID
const GetPrincipalByIdSICBC = async (req, res) => {
  try {
    const principal = await PrincipalRegister.findById(req.params.id).select("-password");
    if (!principal) return res.status(404).json({ message: "Principal not found" });

    res.status(200).json(principal);
  } catch (error) {
    console.error("Error fetching principal:", error);
    res.status(500).json({ message: "Server error while fetching principal" });
  }
};

// UPDATE
const UpdatePrincipalSICBC = async (req, res) => {
  try {
    const { name, phone, institutionType, designation, department, campus } = req.body;
    const principal = await PrincipalRegister.findById(req.params.id);

    if (!principal) return res.status(404).json({ message: "Principal not found" });

    principal.name = name || principal.name;
    principal.phone = phone || principal.phone;
    principal.institutionType = institutionType || principal.institutionType;
    principal.designation = designation || principal.designation;
    principal.department = department || principal.department;
    principal.campus = campus || principal.campus;

    await principal.save();

    res.status(200).json({ message: "Principal updated successfully", principal });
  } catch (error) {
    console.error("Error updating principal:", error);
    res.status(500).json({ message: "Server error while updating principal" });
  }
};

// DELETE
const DeletePrincipalSICBC = async (req, res) => {
  try {
    const principal = await PrincipalRegister.findByIdAndDelete(req.params.id);
    if (!principal) return res.status(404).json({ message: "Principal not found" });

    res.status(200).json({ message: "Principal deleted successfully" });
  } catch (error) {
    console.error("Error deleting principal:", error);
    res.status(500).json({ message: "Server error while deleting principal" });
  }
};

// LOGIN
const LoginPrincipalSICBC = async (req, res) => {
  try {
    const { email, password } = req.body;
    const principal = await PrincipalRegister.findOne({ email });

    if (!principal) return res.status(404).json({ message: "Principal not found" });

    const isMatch = await bcrypt.compare(password, principal.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", principal });
  } catch (error) {
    console.error("Error during principal login:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// UPDATE PASSWORD
const UpdatePasswordPrincipalSICBC = async (req, res) => {
  try {
    const { email, newpassword } = req.body;

    const principal = await PrincipalRegister.findOne({ email });
    if (!principal) return res.status(404).json({ message: "Principal not found" });

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    principal.password = hashedPassword;
    await principal.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server error while updating password" });
  }
};

module.exports = {
  CreatePrincipalSICBC,
  GetAllPrincipalsSICBC,
  GetPrincipalByIdSICBC,
  UpdatePrincipalSICBC,
  DeletePrincipalSICBC,
  LoginPrincipalSICBC,
  UpdatePasswordPrincipalSICBC,
};

