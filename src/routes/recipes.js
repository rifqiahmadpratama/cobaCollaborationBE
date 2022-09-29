const express = require("express");
const router = express.Router();
const recipesController = require("../controller/recipes");
const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/", recipesController.getPaginationRecipes);

router.get("/bysavedrecipes", recipesController.getPaginationRecipesSavedRecipes);
router.get("/bylikesrecipes", recipesController.getPaginationRecipesLikesRecipes);
router.get("/bycommentrecipes", recipesController.getPaginationRecipesCommentRecipes);



router.get("/:id", recipesController.getRecipes);

router.post("/", protect, upload.single("photo_id"), recipesController.insertRecipes);
router.put("/:id", protect, upload.single("photo_id"), recipesController.updateRecipes);
router.delete("/:id", protect, recipesController.deleteRecipes);


router.get('/usersrecipes/:id', recipesController.getPaginationRecipestByUser);

router.delete('/selected/:id', protect, recipesController.deleteRecipesSelected);

router.get('/category/:name', recipesController.getPaginationRecipesCategory);





module.exports = router;
