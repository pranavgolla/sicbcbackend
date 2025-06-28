const express = require("express");
const router = express.Router();
const LabInchargeController = require("../../controllers/LabIncharge/LabInchargeController");

// Base route: /sicbc/labincharge

// ✅ Register Lab Incharge
router.post("/register", LabInchargeController.RegisterLabIncharge);

// ✅ Login
router.post("/login", LabInchargeController.LoginLabIncharge);

// ✅ Get all
router.get("/get", LabInchargeController.GetAllLabIncharges);

// ✅ Get by ID
router.get("/get/:id", LabInchargeController.GetLabInchargeById);

// ✅ Update by ID
router.put("/update/:id", LabInchargeController.UpdateLabInchargeById);

// ✅ Delete by ID
router.delete("/delete/:id", LabInchargeController.DeleteLabInchargeById);

// ✅ Update password
router.put("/update-password", LabInchargeController.UpdatePasswordLabIncharge);

module.exports = router;
