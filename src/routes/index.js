const express = require("express");
const router = express.Router();

const categoryRouter = require("../routes/category");
const usersRouter = require("../routes/users");
const recipesRouter = require("../routes/recipes");
const savedRecipesRouter = require("../routes/savedrecipes");

router
    .use("/recipes", recipesRouter)
    .use("/category", categoryRouter)
    .use("/users", usersRouter)
    .use("/savedrecipes", savedRecipesRouter);

module.exports = router;
