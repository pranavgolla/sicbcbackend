const express = require("express");
const router = express.Router();
const StudentController = require("../../controllers/Student/StudentController");

// Base route: /sicbc/student

// ✅ Register a new student
router.post("/register", StudentController.RegisterStudent);

// ✅ Login
router.post("/login", StudentController.LoginStudent);

// ✅ Get all students
router.get("/get", StudentController.GetAllStudents);

// ✅ Get student by ID
router.get("/get/:id", StudentController.GetStudentById);

// ✅ Update student by ID
router.put("/update/:id", StudentController.UpdateStudentById);

// ✅ Delete student by ID
router.delete("/delete/:id", StudentController.DeleteStudentById);

// ✅ Update password (via email + current password)
router.put("/update-password", StudentController.UpdatePasswordStudent);

module.exports = router;
