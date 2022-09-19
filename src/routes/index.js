const express = require("express");
const router = express.Router();

const categoryRouter = require("../routes/category");
const usersRouter = require("../routes/users");
const recipesRouter = require("../routes/recipes");
const savedRecipesRouter = require("../routes/savedrecipes");

router

    .use("/users", usersRouter)
    .use("/category", categoryRouter)
    .use("/recipes", recipesRouter)
    .use("/savedrecipes", savedRecipesRouter);

module.exports = router;
