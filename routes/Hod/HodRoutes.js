const express = require("express");
const router = express.Router();
const HodController = require("../../controllers/Hod/HodController");

// Base route: /sicbc/hod

// ✅ Register a new HOD
router.post("/register", HodController.RegisterHOD);

// ✅ Login
router.post("/login", HodController.LoginHOD);

// ✅ Get all HODs
router.get("/get", HodController.GetAllHODs);

// ✅ Get HOD by ID
router.get("/get/:id", HodController.GetHODById);

// ✅ Update HOD by ID
router.put("/update/:id", HodController.UpdateHODById);

// ✅ Delete HOD by ID
router.delete("/delete/:id", HodController.DeleteHODById);

// ✅ Update password (via email)
router.put("/update-password", HodController.UpdatePasswordHOD);

module.exports = router;
