const express = require("express");
const router = express.Router();
const {
  CreatePrincipalSICBC,
  GetAllPrincipalsSICBC,
  GetPrincipalByIdSICBC,
  UpdatePrincipalSICBC,
  DeletePrincipalSICBC,
} = require("../../controllers/Principal/PrincipalController");

// CREATE
router.post("/create", CreatePrincipalSICBC);

// READ ALL
router.get("/all", GetAllPrincipalsSICBC);

// READ ONE
router.get("/:id", GetPrincipalByIdSICBC);

// UPDATE
router.put("/update/:id", UpdatePrincipalSICBC);

// DELETE
router.delete("/delete/:id", DeletePrincipalSICBC);

module.exports = router;
