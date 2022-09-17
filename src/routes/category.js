const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category");
const { protect } = require("../middlewares/auth");
// const { checkInputCategory, checkUpdateCategory, checkDeleteCategory,
// } = require('../middlewares/common');

router.get("/", protect, categoryController.getPaginationCategory);
router.get("/:id", protect, categoryController.getCategory);
router.post("/", protect, categoryController.insertCategory);
router.put("/:id", protect, categoryController.updateCategory);
router.delete("/:id", protect, categoryController.deleteCategory);

module.exports = router;
