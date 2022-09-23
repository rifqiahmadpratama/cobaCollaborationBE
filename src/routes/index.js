const express = require("express");
const router = express.Router();

const categoryRouter = require("../routes/category");
const usersRouter = require("../routes/users");
const recipesRouter = require("../routes/recipes");
const savedRecipesRouter = require("../routes/savedrecipes");
const likesRecipesRouter = require("../routes/likesrecipes");
const commentRecipesRouter = require("../routes/commentrecipes");

router

    .use("/users", usersRouter)
    .use("/category", categoryRouter)
    .use("/recipes", recipesRouter)
    .use("/savedrecipes", savedRecipesRouter)
    .use("/likesrecipes", likesRecipesRouter)
    .use("/commentrecipes", commentRecipesRouter);

module.exports = router;
