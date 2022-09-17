const { v4: uuidv4 } = require("uuid");
const recipesModel = require("../models/recipes");
const createError = require("http-errors");
const commonHelper = require("../helper/common");
// const client = require('../config/redis')

const recipesController = {
  getPaginationRecipes: async (req, res) => {
    try {
      // console.log('cona');
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      // console.log(offset);

      const search = req.query.search;
      let querysearch = "";
      if (search === undefined) {
        querysearch = ``;
      } else {
        querysearch = ` where name  like '%${search.toLowerCase()}%' `;
      }
      const sortby = req.query.sortby || "created_on";
      const sort = req.query.sort || "asc";
      const result = await recipesModel.selectPagination({
        limit,
        offset,
        sortby,
        sort,
        querysearch
      });

      const totalData = parseInt((await recipesModel.selectAll()).rowCount);
      // console.log(result);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      // console.log(pagination);

      commonHelper.response(res, result.rows, 200, null, pagination);
      // console.log(result);

    } catch (error) {
      res.send(createError(404));
    }
  },
  getRecipes: async (req, res) => {
    try {
      const id = req.params.id;

      const checkRecipes = await recipesModel.selectRecipes(id);
      try {
        if (checkRecipes.rowCount == 0) throw "Recipe has not found";

      } catch (error) {
        return commonHelper.response(res, null, 404, error);
      }

      const result = await recipesModel.selectRecipes(id);
      // console.log(result);

      // client.setEx(`product/${id}`, 60 * 60, JSON.stringify(result.rows))
      commonHelper.response(res, result.rows, 200, null);
    } catch (error) {
      res.send(createError(404));
    }
  },
  insertRecipes: async (req, res) => {
    try {
      const id = uuidv4().toLocaleLowerCase();
      const PORT = process.env.PORT;
      const DB_HOST = process.env.DB_HOST;
      const filephoto = req.file.filename;
      const photo_id = `http://${DB_HOST}:${PORT}/upload/${filephoto}`;

      const { name, description, category_id, id_users } = req.body;


      const checkCategory = await recipesModel.selectCategory(category_id);


      try {
        if (checkCategory.rowCount == 0) throw "Category has not found";
      } catch (error) {
        return commonHelper.response(res, null, 404, error);
      }

      const checkUsers = await recipesModel.selectUsers(id_users);

      try {
        if (checkUsers.rowCount == 0) throw "Users has not found";

      } catch (error) {
        return commonHelper.response(res, null, 404, error);
      }

      await recipesModel.insertRecipes(id, photo_id, name, description, category_id, id_users);
      commonHelper.response(res, null, 201, "New Recipes Created");
      // console.log(id, photo_id, name, description, category_id, id_users);

    } catch (error) {
      res.send(createError(400));
    }
  },
  updateRecipes: async (req, res) => {
    try {
      const id = req.params.id;

      const checkProduct = await recipesModel.selectRecipes(id);

      try {
        if (checkProduct.rowCount == 0) throw "Product has not found";
      } catch (error) {
        return commonHelper.response(res, null, 404, error);
      }

      const PORT = process.env.PORT;
      const DB_HOST = process.env.DB_HOST;
      // console.log(req.file);
      if (req.file) {
        const filephoto = req.file.filename;
        const photo_id = `http://${DB_HOST}:${PORT}/upload/${filephoto}`;

        const { name, description, category_id, id_users } = req.body;

        const checkCategory = await recipesModel.selectCategory(category_id);

        try {
          if (checkCategory.rowCount == 0) throw "Category has not found";
        } catch (error) {
          return commonHelper.response(res, null, 404, error);
        }

        const checkUsers = await recipesModel.selectUsers(id_users);

        try {
          if (checkUsers.rowCount == 0) throw "Users has not found";
        } catch (error) {
          return commonHelper.response(res, null, 404, error);
        }


        await recipesModel.updateRecipes(id, photo_id, name, description, category_id, id_users);
        // console.log(id, photo_id, name, description, category_id, id_users);
        // const result = await productModel.selectProduct(id)
        // client.setEx(`product/${id}`, 60 * 60, JSON.stringify(result.rows))

        commonHelper.response(res, null, 201, "Recipes Update");
      } else {
        const { name, description, category_id, id_users } = req.body;

        const checkCategory = await recipesModel.selectCategory(category_id);

        try {
          if (checkCategory.rowCount == 0) throw "Category has not found";
        } catch (error) {
          return commonHelper.response(res, null, 404, error);
        }

        const checkUsers = await recipesModel.selectUsers(id_users);

        try {
          if (checkUsers.rowCount == 0) throw "Users has not found";
        } catch (error) {
          return commonHelper.response(res, null, 404, error);
        }


        await recipesModel.updateRecipesNoPhoto(id, name, description, category_id, id_users);
        // console.log(id, photo_id, name, description, category_id, id_users);
        // const result = await productModel.selectProduct(id)
        // client.setEx(`product/${id}`, 60 * 60, JSON.stringify(result.rows))

        commonHelper.response(res, null, 201, "Recipes Update");
      }


    } catch (error) {
      res.send(createError(400));
    }
  },

  deleteRecipes: async (req, res) => {
    try {
      const id = req.params.id;

      const checkRecipes = await recipesModel.selectRecipes(id);
      try {
        if (checkRecipes.rowCount == 0) throw "Recipe has not found";

      } catch (error) {
        return commonHelper.response(res, null, 404, error);
      }

      await recipesModel.deleteRecipes(id);
      commonHelper.response(res, null, 200, "Recipes Deleted");

    } catch (error) {
      res.send(createError(404));
    }
  },
};

module.exports = recipesController;
