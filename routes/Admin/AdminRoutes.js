const express = require("express");
const router = express.Router();
const AdminControllerSICBC = require("../../controllers/Admin/AdminController");

// ✅ Register new admin
router.post("/register", AdminControllerSICBC.CreateAdminRegisterSICBC);

// ✅ Admin login
router.post("/login", AdminControllerSICBC.LoginAdminSICBC);

// ✅ Update admin password
router.put("/update-password", AdminControllerSICBC.UpdatePasswordAdminSICBC);

// ✅ Get one or all admins
router.get("/get", AdminControllerSICBC.GetAdminSICBC);

module.exports = router;
