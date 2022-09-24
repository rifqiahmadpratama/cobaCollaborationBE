const { v4: uuidv4 } = require("uuid");
const likesRecipesModel = require("../models/likesrecipes");
const createError = require("http-errors");
const commonHelper = require("../helper/common");
// const client = require('../config/redis')

const likesRecipesController = {
    getPaginationLikesRecipes: async (req, res) => {
        // console.log('coba');
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const search = req.query.search;
            let querysearch = "";
            let totalData = "";
            if (search === undefined) {
                querysearch = ``;
                totalData = parseInt((await likesRecipesModel.selectAll()).rowCount);
            } else {
                querysearch = ` inner join recipes on likesrecipes.recipes_id = recipes.id inner join users on likesrecipes.users_id = users.id where recipes.name ilike '%${search}%' `;
                totalData = parseInt((await likesRecipesModel.selectAllSearch(querysearch)).rowCount);
            }
            const sortby = req.query.sortby || "created_on";
            const sort = req.query.sort || "asc";
            const result = await likesRecipesModel.selectPagination({ limit, offset, sortby, sort, querysearch });
            // console.log(await likesRecipesModel.selectPagination());
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
    getLikesRecipes: async (req, res) => {
        try {
            const id = req.params.id;

            const checklikesRecipes = await likesRecipesModel.selectLikesRecipes(id);

            try {
                if (checklikesRecipes.rowCount == 0) throw "Recipes has not found";
            } catch (error) {
                return commonHelper.response(res, null, 404, error);
            }

            const result = await likesRecipesModel.selectLikesRecipes(id);
            // client.setEx(`transaction/${id}`, 60 * 60, JSON.stringify(result.rows))
            commonHelper.response(res, result.rows, 200, null);
        } catch (error) {
            res.send(createError(404));
        }
    },
    insertLikesRecipes: async (req, res) => {
        try {
            const id = uuidv4().toLocaleLowerCase();

            const { recipes_id, users_id } = req.body;
            // console.log(req.body.i);

            const checkRecipes = await likesRecipesModel.selectRecipes(recipes_id);
            // console.log(checkRecipes);
            try {
                if (checkRecipes.rowCount == 0) throw "Recipes has not found";
            } catch (error) {
                return commonHelper.response(res, null, 404, error);
            }

            const checkUsers = await likesRecipesModel.selectUsers(users_id);

            try {
                if (checkUsers.rowCount == 0) throw "Users has not found";
            } catch (error) {
                return commonHelper.response(res, null, 404, error);
            }

            await likesRecipesModel.insertLikesRecipes(id, recipes_id, users_id);
            commonHelper.response(res, null, 201, "New Likes Recipes Created");
            // console.log(id, photo_id, name, description, category_id, users_id);
        } catch (error) {
            res.send(createError(400));
        }
    },
    updateLikesRecipes: async (req, res) => {
        try {
            const id = req.params.id;
            // const { product_id, quantity, discount, payment_id, status_payment, status_transaction, users_id } = req.body;

            const { recipes_id, users_id } = req.body;
            // console.log(req.body.i);

            const checklikesRecipes = await likesRecipesModel.selectLikesRecipes(id);

            try {
                if (checklikesRecipes.rowCount == 0) throw "Likes Recipes has not found";
            } catch (error) {
                return commonHelper.response(res, null, 404, error);
            }

            const checkRecipes = await likesRecipesModel.selectRecipes(recipes_id);
            // console.log(checkRecipes);
            try {
                if (checkRecipes.rowCount == 0) throw "Recipes has not found";
            } catch (error) {
                return commonHelper.response(res, null, 404, error);
            }

            const checkUsers = await likesRecipesModel.selectUsers(users_id);
            // console.log(checkUsers);
            try {
                if (checkUsers.rowCount == 0) throw "Users has not found";
            } catch (error) {
                return commonHelper.response(res, null, 404, error);
            }

            await likesRecipesModel.updateLikesRecipes(id, recipes_id, users_id);
            // console.log(await likesRecipesModel.updatelikesRecipes(id, recipes_id, users_id));
            // console.log(id);
            commonHelper.response(res, null, 201, "Likes Recipes Updated");
        } catch (error) {
            res.send(createError(400));
        }
    },
    deleteLikesRecipes: async (req, res) => {
        try {
            const id = req.params.id;

            const checklikesRecipes = await likesRecipesModel.selectLikesRecipes(id);

            try {
                if (checklikesRecipes.rowCount == 0) throw "Likes Recipes has not found";
            } catch (error) {
                return commonHelper.response(res, null, 404, error);
            }

            likesRecipesModel.deleteLikesRecipes(id);
            commonHelper.response(res, null, 200, "Likes Recipes Deleted");
        } catch (error) {
            res.send(createError(404));
        }
    }
};

module.exports = likesRecipesController;
