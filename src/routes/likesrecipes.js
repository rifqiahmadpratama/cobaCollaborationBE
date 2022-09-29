const express = require("express");
const router = express.Router();
const likesRecipesController = require("../controller/likesrecipes");
const { protect } = require("../middlewares/auth");

router.get("/", likesRecipesController.getPaginationLikesRecipes);
router.get("/ByUserByIdRecipes", likesRecipesController.getLikesRecipesByUserByIdRecipes);
router.get("/ByUser/:id", likesRecipesController.getLikesRecipesByUser);
router.get("/:id", likesRecipesController.getLikesRecipes);
router.post("/", protect, likesRecipesController.insertLikesRecipes);
router.put("/:id", protect, likesRecipesController.updateLikesRecipes);
router.delete("/:id", protect, likesRecipesController.deleteLikesRecipes);
module.exports = router;
