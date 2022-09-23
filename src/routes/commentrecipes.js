const express = require("express");
const router = express.Router();
const commentRecipesController = require("../controller/commentrecipes");
const { protect } = require("../middlewares/auth");

router.get("/", commentRecipesController.getPaginationCommentRecipes);
router.get("/:id", commentRecipesController.getCommentRecipes);
router.post("/", protect, commentRecipesController.insertCommentRecipes);
router.put("/:id", protect, commentRecipesController.updateCommentRecipes);
router.delete("/:id", protect, commentRecipesController.deleteCommentRecipes);

module.exports = router;
