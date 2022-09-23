const { v4: uuidv4 } = require("uuid");
const commentRecipesModel = require("../models/commentrecipes");
const createError = require("http-errors");
const commonHelper = require("../helper/common");
// const client = require('../config/redis')

const commentRecipesController = {
    getPaginationCommentRecipes: async (req, res) => {
        // console.log('coba');
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const search = req.query.search;
            let querysearch = "";
            if (search === undefined) {
                querysearch = ``;
            } else {
                querysearch = ` inner join recipes on commentrecipes.recipes_id = recipes.id inner join users on commentrecipes.users_id = users.id where name ilike '%${search}%' `;
            }
            const sortby = req.query.sortby || "created_on";
            const sort = req.query.sort || "asc";
            const result = await commentRecipesModel.selectPagination({ limit, offset, sortby, sort, querysearch });
            // console.log(await commentRecipesModel.selectPagination());
            const totalData = parseInt((await commentRecipesModel.selectAll()).rowCount);
            const totalPage = Math.ceil(totalData / limit);
            const pagination = {
                currentPage: page,
                limit: limit,
                totalData: totalData,
                totalPage: totalPage,
            };
            commonHelper.response(res, result.rows, 200, null, pagination);
        } catch (error) {
            res.send(createError(404));
        }
    },
    getCommentRecipes: async (req, res) => {
        try {
            const id = req.params.id;

            const checkcommentRecipes = await commentRecipesModel.selectcommentRecipes(id);

            try {
                if (checkcommentRecipes.rowCount == 0) throw "Recipes has not found";
            } catch (error) {
                return commonHelper.response(res, null, 404, error);
            }

            const result = await commentRecipesModel.selectCommentRecipes(id);
            // client.setEx(`transaction/${id}`, 60 * 60, JSON.stringify(result.rows))
            commonHelper.response(res, result.rows, 200, null);
        } catch (error) {
            res.send(createError(404));
        }
    },
    insertCommentRecipes: async (req, res) => {
        try {
            const id = uuidv4().toLocaleLowerCase();

            const { recipes_id, users_id } = req.body;
            // console.log(req.body.i);

            const checkRecipes = await commentRecipesModel.selectRecipes(recipes_id);
            // console.log(checkRecipes);
            try {
                if (checkRecipes.rowCount == 0) throw "Recipes has not found";
            } catch (error) {
                return commonHelper.response(res, null, 404, error);
            }

            const checkUsers = await commentRecipesModel.selectUsers(users_id);

            try {
                if (checkUsers.rowCount == 0) throw "Users has not found";
            } catch (error) {
                return commonHelper.response(res, null, 404, error);
            }

            await commentRecipesModel.insertCommentRecipes(id, recipes_id, users_id);
            commonHelper.response(res, null, 201, "New Comment Recipes Created");
            // console.log(id, photo_id, name, description, category_id, users_id);
        } catch (error) {
            res.send(createError(400));
        }
    },
    updateCommentRecipes: async (req, res) => {
        try {
            const id = req.params.id;
            // const { product_id, quantity, discount, payment_id, status_payment, status_transaction, users_id } = req.body;

            const { recipes_id, users_id } = req.body;
            // console.log(req.body.i);

            const checkRecipes = await commentRecipesModel.selectRecipes(recipes_id);
            // console.log(checkRecipes);
            try {
                if (checkRecipes.rowCount == 0) throw "Recipes has not found";
            } catch (error) {
                return commonHelper.response(res, null, 404, error);
            }

            const checkUsers = await commentRecipesModel.selectUsers(users_id);
            // console.log(checkUsers);
            try {
                if (checkUsers.rowCount == 0) throw "Users has not found";
            } catch (error) {
                return commonHelper.response(res, null, 404, error);
            }

            await commentRecipesModel.updateCommentRecipes(id, recipes_id, users_id);
            // console.log(await commentRecipesModel.updatecommentRecipes(id, recipes_id, users_id));
            // console.log(id);
            commonHelper.response(res, null, 201, "Comment Recipes Updated");
        } catch (error) {
            res.send(createError(400));
        }
    },
    deleteCommentRecipes: async (req, res) => {
        try {
            const id = req.params.id;

            const checkcommentRecipes = await commentRecipesModel.selectRecipes(id);

            try {
                if (checkcommentRecipes.rowCount == 0) throw "Comment Recipes has not found";
            } catch (error) {
                return commonHelper.response(res, null, 404, error);
            }

            commentRecipesModel.deleteCommentRecipes(id);
            commonHelper.response(res, null, 200, "Comment Recipes Deleted");
        } catch (error) {
            res.send(createError(404));
        }
    }
};

module.exports = commentRecipesController;
