const express = require("express");
const router = express.Router();
const PrincipalController = require("../../controllers/Principal/PrincipalController");

// Main route: /sicbc/principal

router.post("/register", PrincipalController.CreatePrincipalSICBC);
router.get("/get", PrincipalController.GetAllPrincipalsSICBC);
router.get("/get/:id", PrincipalController.GetPrincipalByIdSICBC);
router.put("/update/:id", PrincipalController.UpdatePrincipalSICBC);
router.delete("/delete/:id", PrincipalController.DeletePrincipalSICBC);
router.post("/login", PrincipalController.LoginPrincipalSICBC);
router.put("/update-password", PrincipalController.UpdatePasswordPrincipalSICBC);

module.exports = router;
