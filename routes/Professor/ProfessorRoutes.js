const express = require("express");
const router = express.Router();
const ProfessorController = require("../../controllers/Professor/ProfessorController");

// Base route: /sicbc/professor
router.post("/register", ProfessorController.registerProfessor);
router.post("/login", ProfessorController.loginProfessor);
router.get("/get", ProfessorController.getAllProfessors);
router.get("/get/:id", ProfessorController.getProfessorById);
router.put("/update/:id", ProfessorController.updateProfessorById);
router.delete("/delete/:id", ProfessorController.deleteProfessorById);
router.put("/update-password", ProfessorController.updatePasswordProfessor);

module.exports = router;
