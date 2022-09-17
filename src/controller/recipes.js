const { v4: uuidv4 } = require("uuid");
<<<<<<< HEAD
const recipesModel = require("../models/recipes");
=======
const productModel = require("../models/product");
>>>>>>> 18df7fa3d4a7ad4726f780f902ee46d91436909d
const createError = require("http-errors");
const commonHelper = require("../helper/common");
// const client = require('../config/redis')

const recipesController = {
<<<<<<< HEAD
  getPaginationRecipes: async (req, res) => {
    try {
      // console.log('cona');
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      // console.log(offset);
=======
  getPaginationProduct: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
>>>>>>> 18df7fa3d4a7ad4726f780f902ee46d91436909d

      const search = req.query.search;
      let querysearch = "";
      if (search === undefined) {
        querysearch = ``;
      } else {
        querysearch = ` where name  like '%${search.toLowerCase()}%' `;
      }
      const sortby = req.query.sortby || "created_on";
      const sort = req.query.sort || "asc";
<<<<<<< HEAD
      const result = await recipesModel.selectPagination({
        limit,
        offset,
        sortby,
        sort,
        querysearch
      });

      const totalData = parseInt((await recipesModel.selectAll()).rowCount);
      // console.log(result);
=======
      const result = await productModel.selectPagination({ limit, offset, sortby, sort, querysearch });
      const totalData = parseInt((await productModel.selectAll()).rowCount);
>>>>>>> 18df7fa3d4a7ad4726f780f902ee46d91436909d
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
<<<<<<< HEAD
      // console.log(pagination);

      commonHelper.response(res, result.rows, 200, null, pagination);
      // console.log(result);
=======
      commonHelper.response(res, result.rows, 200, null, pagination);
>>>>>>> 18df7fa3d4a7ad4726f780f902ee46d91436909d
    } catch (error) {
      res.send(createError(404));
    }
  },
<<<<<<< HEAD
  getRecipes: async (req, res) => {
    try {
      const id = req.params.id;

      const checkRecipes = await recipesModel.selectRecipes(id);
      try {
        if (checkRecipes.rowCount == 0) throw "Recipe has not found";
=======
  getProduct: async (req, res) => {
    try {
      const id = req.params.id;

      const checkProduct = await productModel.selectProduct(id);
      try {
        if (checkProduct.rowCount == 0) throw "Product has not found";
>>>>>>> 18df7fa3d4a7ad4726f780f902ee46d91436909d
      } catch (error) {
        return commonHelper.response(res, null, 404, error);
      }

<<<<<<< HEAD
      const result = await recipesModel.selectRecipes(id);
      // console.log(result);
=======
      const result = await productModel.selectProduct(id);
>>>>>>> 18df7fa3d4a7ad4726f780f902ee46d91436909d
      // client.setEx(`product/${id}`, 60 * 60, JSON.stringify(result.rows))
      commonHelper.response(res, result.rows, 200, null);
    } catch (error) {
      res.send(createError(404));
    }
  },
<<<<<<< HEAD
  insertRecipes: async (req, res) => {
=======
  insertProduct: async (req, res) => {
>>>>>>> 18df7fa3d4a7ad4726f780f902ee46d91436909d
    try {
      const id = uuidv4().toLocaleLowerCase();
      const PORT = process.env.PORT;
      const DB_HOST = process.env.DB_HOST;
      const filephoto = req.file.filename;
<<<<<<< HEAD
      const photo_id = `http://${DB_HOST}:${PORT}/upload/${filephoto}`;

      const { name, description, category_id, id_users } = req.body;


      const checkCategory = await recipesModel.selectCategory(category_id);
=======
      const photo = `http://${DB_HOST}:${PORT}/upload/${filephoto}`;

      const { name, brand, price, stock, color, size, description, status, category_id, seller_id } = req.body;

      const statusLowerCase = status.toLowerCase();
      const category_idLowerCase = category_id.toLowerCase();
      const seller_idLowerCase = seller_id.toLowerCase();

      const checkCategory = await productModel.selectCategory(category_idLowerCase);
>>>>>>> 18df7fa3d4a7ad4726f780f902ee46d91436909d

      try {
        if (checkCategory.rowCount == 0) throw "Category has not found";
      } catch (error) {
        return commonHelper.response(res, null, 404, error);
      }

<<<<<<< HEAD
      const checkUsers = await recipesModel.selectUsers(id_users);

      try {
        if (checkUsers.rowCount == 0) throw "Users has not found";
=======
      const checkSeller = await productModel.selectSeller(seller_idLowerCase);

      try {
        if (checkSeller.rowCount == 0) throw "Seller has not found";
>>>>>>> 18df7fa3d4a7ad4726f780f902ee46d91436909d
      } catch (error) {
        return commonHelper.response(res, null, 404, error);
      }

<<<<<<< HEAD
      await recipesModel.insertRecipes(id, photo_id, name, description, category_id, id_users);
      commonHelper.response(res, null, 201, "New Recipes Created");
      // console.log(id, photo_id, name, description, category_id, id_users);
=======
      await productModel.insertProduct(id, name, brand, price, stock, photo, color, size, description, statusLowerCase, category_idLowerCase, seller_idLowerCase);
      commonHelper.response(res, null, 201, "New Product Created");
>>>>>>> 18df7fa3d4a7ad4726f780f902ee46d91436909d
    } catch (error) {
      res.send(createError(400));
    }
  },
<<<<<<< HEAD
  updateRecipes: async (req, res) => {
    try {
      const id = req.params.id;

      const checkProduct = await recipesModel.selectRecipes(id);
=======
  updateProduct: async (req, res) => {
    try {
      const id = req.params.id;

      const checkProduct = await productModel.selectProduct(id);
>>>>>>> 18df7fa3d4a7ad4726f780f902ee46d91436909d
      try {
        if (checkProduct.rowCount == 0) throw "Product has not found";
      } catch (error) {
        return commonHelper.response(res, null, 404, error);
      }

      const PORT = process.env.PORT;
      const DB_HOST = process.env.DB_HOST;
<<<<<<< HEAD
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

=======
      const filephoto = req.file.filename;
      const photo = `http://${DB_HOST}:${PORT}/upload/${filephoto}`;

      const { name, brand, price, stock, color, size, description, status, category_id, seller_id } = req.body;

      const statusLowerCase = status.toLowerCase();
      const category_idLowerCase = category_id.toLowerCase();
      const seller_idLowerCase = seller_id.toLowerCase();

      const checkCategory = await productModel.selectCategory(category_idLowerCase);

      try {
        if (checkCategory.rowCount == 0) throw "Category has not found";
      } catch (error) {
        return commonHelper.response(res, null, 404, error);
      }

      const checkSeller = await productModel.selectSeller(seller_idLowerCase);

      try {
        if (checkSeller.rowCount == 0) throw "Seller has not found";
      } catch (error) {
        return commonHelper.response(res, null, 404, error);
      }

      await productModel.updateProduct(id, name, brand, price, stock, photo, color, size, description, statusLowerCase, category_idLowerCase, seller_idLowerCase);

      // const result = await productModel.selectProduct(id)
      // client.setEx(`product/${id}`, 60 * 60, JSON.stringify(result.rows))
      await productModel.selectProduct(id);

      commonHelper.response(res, null, 201, "Product Update");
>>>>>>> 18df7fa3d4a7ad4726f780f902ee46d91436909d
    } catch (error) {
      res.send(createError(400));
    }
  },

<<<<<<< HEAD
  deleteRecipes: async (req, res) => {
    try {
      const id = req.params.id;

      const checkRecipes = await recipesModel.selectRecipes(id);
      try {
        if (checkRecipes.rowCount == 0) throw "Recipe has not found";
=======
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;

      const checkProduct = await productModel.selectProduct(id);

      try {
        if (checkProduct.rowCount == 0) throw "Product has not found";
>>>>>>> 18df7fa3d4a7ad4726f780f902ee46d91436909d
      } catch (error) {
        return commonHelper.response(res, null, 404, error);
      }

<<<<<<< HEAD
      await recipesModel.deleteRecipes(id);
      commonHelper.response(res, null, 200, "Recipes Deleted");
=======
      await productModel.deleteProduct(id);
      commonHelper.response(res, null, 200, "Product Deleted");
>>>>>>> 18df7fa3d4a7ad4726f780f902ee46d91436909d
    } catch (error) {
      res.send(createError(404));
    }
  },
};

module.exports = recipesController;
