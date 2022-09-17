const express = require("express");
const router = express.Router();
const savedRecipesController = require("../controller/savedrecipes");
const { protect } = require("../middlewares/auth");

router.get("/", protect, savedRecipesController.getPaginationRecipes);
router.get("/:id", protect, savedRecipesController.getSavedRecipes);
router.post("/", protect, savedRecipesController.insertSavedRecipes);
router.put("/:id", protect, savedRecipesController.updateSavedRecipes);
router.delete("/:id", protect, savedRecipesController.deleteSavedRecipes);

module.exports = router;
