const express = require("express");
const router = express.Router();
const GuardianController = require("../../controllers/Guardian/GuardianController");

// Base route: /sicbc/guardian

// ✅ Register a new guardian
router.post("/register", GuardianController.RegisterGuardian);

// ✅ Login
router.post("/login", GuardianController.LoginGuardian);

// ✅ Get all guardians
router.get("/get", GuardianController.GetAllGuardians);

// ✅ Get guardian by ID
router.get("/get/:id", GuardianController.GetGuardianById);

// ✅ Update guardian by ID
router.put("/update/:id", GuardianController.UpdateGuardianById);

// ✅ Delete guardian by ID
router.delete("/delete/:id", GuardianController.DeleteGuardianById);

// ✅ Update password
router.put("/update-password", GuardianController.UpdatePasswordGuardian);

module.exports = router;
