const express = require("express");
const router = express.Router();
const recipesController = require("../controller/recipes");
const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/", recipesController.getPaginationRecipes);
router.get("/:id", recipesController.getRecipes);

router.post("/", protect, upload.single("photo_id"), recipesController.insertRecipes);
router.put("/:id", protect, upload.single("photo_id"), recipesController.updateRecipes);
router.delete("/:id", protect, recipesController.deleteRecipes);


router.get('/usersrecipes/:id', recipesController.getPaginationRecipestByUser);



module.exports = router;
