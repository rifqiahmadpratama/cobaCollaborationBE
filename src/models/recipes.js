const Pool = require('../config/db')
const selectAll = () => {
    return Pool.query(`select * from recipes`);
}
const selectAllSearch = (querysearch) => {
    return Pool.query(`select * from recipes inner join users on users.id = recipes.users_id  inner join category on category.id = recipes.category_id  ${querysearch} `);
}

const selectPagination = ({ limit, offset, sortby, sort, querysearch }) => {
    return Pool.query(`select * from recipes ${querysearch} order by ${sortby} ${sort} limit ${limit} offset ${offset}`)
}

const selectRecipes = (id) => {
    return Pool.query(`select * from recipes where id='${id}'`);
}

const insertRecipes = (
    id,
    photo_id,
    videos_id,
    name,
    description,
    category_id,
    users_id

) => {
    return Pool.query(`insert into recipes ( id, photo_id, videos_id, name, description, category_id, users_id )   values ( '${id}' , '${photo_id}' , '${videos_id}', '${name}' , '${description}' , '${category_id}' , '${users_id}' ) `)
}

const updateRecipes = (
    id,
    photo_id,
    videos_id,
    name,
    description,
    category_id,
    users_id

) => {
    return Pool.query(`update recipes set photo_id = '${photo_id}' , videos_id = '${videos_id}', name = '${name}' , description = '${description}' , category_id = '${category_id}' , users_id = '${users_id}' where id = '${id}' `)
}

const updateRecipesNoPhoto = (
    id,
    videos_id,
    name,
    description,
    category_id,
    users_id

) => {
    return Pool.query(`update recipes set videos_id = '${videos_id}' , name = '${name}' , description = '${description}' , category_id = '${category_id}' , users_id = '${users_id}' where id = '${id}' `)
}

const deleteRecipes = (id) => {
    return Pool.query(`delete from recipes where id='${id}'`)
}

const selectCategory = (category_idLowerCase) => {
    return Pool.query(`select * from category where id='${category_idLowerCase}'`)
}

const selectUsers = (users_id) => {
    return Pool.query(`select * from users where users.id='${users_id}'`)
}

const countData = () => {
    return Pool.query("SELECT COUNT(*) FROM recipes");
}

const selectPaginationUserRecipes = ({ limit, offset, sortby, sort, querysearch }) => {
    // return Pool.query(`select product.id ,  product.name , product.brand , product.price , product.stock , product.photo , product.color , product.size , product.description , product.status , product.category_id , product.seller_id , product.created_on ,  product.updated_on , seller.users_id , seller.name_store , seller.logo , seller.address , seller.description , seller.phone  , COUNT(transaction.product_id) AS ValueFrequency from product inner join transaction on transaction.product_id = product.id inner join seller on seller.id = product.seller_id group by product.id ,  product.name , product.brand , product.price , product.stock , product.photo , product.color , product.size , product.description , product.status , product.category_id , product.seller_id , product.created_on , product.updated_on , seller.users_id , seller.name_store , seller.logo , seller.address , seller.description  ,  seller.phone  ${querysearch} order by ${sortby} ${sort} limit ${limit} offset ${offset} `)
    return Pool.query(`select recipes.id, recipes.name, recipes.photo_id, recipes.videos_id, recipes.description, recipes.category_id, recipes.users_id, recipes.created_on, recipes.updated_on, users.name as users_name, category.name as category_name  from recipes   inner join users on users.id = recipes.users_id inner join category on category.id = recipes.category_id  ${querysearch} order by recipes.${sortby} ${sort} limit ${limit} offset ${offset} `)
}

const deleteRecipesSelected = (id) => {
    return Pool.query(`delete from recipes where id in (${id})`)
}

const selectPaginationCategory = ({ limit, offset, sortby, sort, querysearch }) => {
    // return Pool.query(`select * from product ${querysearch}  order by ${sortby} ${sort} limit ${limit} offset ${offset} `)
    // return Pool.query(`select recipes.id,  recipes.name, recipes.photo_id,  recipes.description, recipes.category_id,  recipes.users_id,  recipes.created_on, recipes.updated_on, users.name as users_name, category.name as category_name from recipes inner join users on users.id = recipes.users_id  inner join category on category.id = recipes.category_id  ${querysearch} order by recipes.${sortby} ${sort} limit ${limit} offset ${offset}`)
    return Pool.query(`select recipes.id,  recipes.name, recipes.photo_id,  recipes.description, recipes.category_id,  recipes.users_id,  recipes.created_on, recipes.updated_on, users.name as users_name, category.name as category_name from recipes inner join users on users.id = recipes.users_id  inner join category on category.id = recipes.category_id  ${querysearch} order by recipes.${sortby} ${sort} limit ${limit} offset ${offset}`)
}


const selectPaginationSavedRecipes = ({ limit, offset, sortby, sort, querysearch }) => {
    return Pool.query(` select recipes.id , recipes.name , recipes.users_id , recipes.description , recipes.photo_id , recipes.videos_id , recipes.category_id , recipes.created_on , recipes.updated_on , users.name AS users_name,users.email AS users_email, category.name AS category_name, COUNT(savedrecipes.recipes_id) AS ValueFrequency from recipes  inner join users on users.id = recipes.users_id  inner join category on category.id = recipes.category_id  inner join savedrecipes on savedrecipes.recipes_id = recipes.id  group by  recipes.id , recipes.name , recipes.users_id , recipes.description ,recipes.photo_id , recipes.videos_id , recipes.category_id , recipes.created_on , recipes.updated_on , users.name , users.email, category.name  ${querysearch} order by ${sortby} ${sort} limit ${limit} offset ${offset} `)
    // return Pool.query(`select product.id,product.name,product.brand,product.price,product.stock,product.photo,product.color,product.size,product.description,product.status,product.category_id,product.seller_id,product.created_on,product.updated_on,seller.users_id,seller.name_store,seller.logo,seller.address,seller.description,seller.phone from product inner join seller on seller.id = product.seller_id ${querysearch} order by product.${sortby} ${sort} limit ${limit} offset ${offset} `)
}

const selectAllSavedRecipes = ({ querysearch }) => {
    return Pool.query(` select recipes.id , recipes.name , recipes.users_id , recipes.description , recipes.photo_id , recipes.videos_id , recipes.category_id , recipes.created_on , recipes.updated_on , users.name AS users_name,users.email AS users_email, category.name AS category_name, COUNT(savedrecipes.recipes_id) AS ValueFrequency from recipes  inner join users on users.id = recipes.users_id  inner join category on category.id = recipes.category_id  inner join savedrecipes on savedrecipes.recipes_id = recipes.id  group by  recipes.id , recipes.name , recipes.users_id , recipes.description ,recipes.photo_id , recipes.videos_id , recipes.category_id , recipes.created_on , recipes.updated_on , users.name , users.email, category.name  ${querysearch} `)
    // return Pool.query(`select product.id,product.name,product.brand,product.price,product.stock,product.photo,product.color,product.size,product.description,product.status,product.category_id,product.seller_id,product.created_on,product.updated_on,seller.users_id,seller.name_store,seller.logo,seller.address,seller.description,seller.phone from product inner join seller on seller.id = product.seller_id ${querysearch} order by product.${sortby} ${sort} limit ${limit} offset ${offset} `)
}

const selectPaginationLikesRecipes = ({ limit, offset, sortby, sort, querysearch }) => {
    return Pool.query(` select recipes.id , recipes.name , recipes.users_id , recipes.description , recipes.photo_id , recipes.videos_id , recipes.category_id , recipes.created_on , recipes.updated_on , users.name AS users_name,users.email AS users_email, category.name AS category_name, COUNT(likesrecipes.recipes_id) AS ValueFrequency from recipes  inner join users on users.id = recipes.users_id  inner join category on category.id = recipes.category_id  inner join likesrecipes on likesrecipes.recipes_id = recipes.id  group by  recipes.id , recipes.name , recipes.users_id , recipes.description ,recipes.photo_id , recipes.videos_id , recipes.category_id , recipes.created_on , recipes.updated_on , users.name , users.email, category.name  ${querysearch} order by ${sortby} ${sort} limit ${limit} offset ${offset} `)
    // return Pool.query(`select product.id,product.name,product.brand,product.price,product.stock,product.photo,product.color,product.size,product.description,product.status,product.category_id,product.seller_id,product.created_on,product.updated_on,seller.users_id,seller.name_store,seller.logo,seller.address,seller.description,seller.phone from product inner join seller on seller.id = product.seller_id ${querysearch} order by product.${sortby} ${sort} limit ${limit} offset ${offset} `)
}

const selectAllLikesRecipes = ({  querysearch }) => {
    return Pool.query(` select recipes.id , recipes.name , recipes.users_id , recipes.description , recipes.photo_id , recipes.videos_id , recipes.category_id , recipes.created_on , recipes.updated_on , users.name AS users_name,users.email AS users_email, category.name AS category_name, COUNT(likesrecipes.recipes_id) AS ValueFrequency from recipes  inner join users on users.id = recipes.users_id  inner join category on category.id = recipes.category_id  inner join likesrecipes on likesrecipes.recipes_id = recipes.id  group by  recipes.id , recipes.name , recipes.users_id , recipes.description ,recipes.photo_id , recipes.videos_id , recipes.category_id , recipes.created_on , recipes.updated_on , users.name , users.email, category.name  ${querysearch} `)
    // return Pool.query(`select product.id,product.name,product.brand,product.price,product.stock,product.photo,product.color,product.size,product.description,product.status,product.category_id,product.seller_id,product.created_on,product.updated_on,seller.users_id,seller.name_store,seller.logo,seller.address,seller.description,seller.phone from product inner join seller on seller.id = product.seller_id ${querysearch} order by product.${sortby} ${sort} limit ${limit} offset ${offset} `)
}

const selectPaginationCommentRecipes = ({ limit, offset, sortby, sort, querysearch }) => {
    return Pool.query(` select recipes.id , recipes.name , recipes.users_id , recipes.description , recipes.photo_id , recipes.videos_id , recipes.category_id , recipes.created_on , recipes.updated_on , users.name AS users_name,users.email AS users_email, category.name AS category_name, COUNT(commentrecipes.recipes_id) AS ValueFrequency from recipes  inner join users on users.id = recipes.users_id  inner join category on category.id = recipes.category_id  inner join commentrecipes on commentrecipes.recipes_id = recipes.id  group by  recipes.id , recipes.name , recipes.users_id , recipes.description ,recipes.photo_id , recipes.videos_id , recipes.category_id , recipes.created_on , recipes.updated_on , users.name , users.email, category.name   ${querysearch} order by ${sortby} ${sort} limit ${limit} offset ${offset} `)
    // return Pool.query(`select product.id,product.name,product.brand,product.price,product.stock,product.photo,product.color,product.size,product.description,product.status,product.category_id,product.seller_id,product.created_on,product.updated_on,seller.users_id,seller.name_store,seller.logo,seller.address,seller.description,seller.phone from product inner join seller on seller.id = product.seller_id ${querysearch} order by product.${sortby} ${sort} limit ${limit} offset ${offset} `)
}
const selectAllCommentRecipes = ({ querysearch }) => {
    return Pool.query(` select recipes.id , recipes.name , recipes.users_id , recipes.description , recipes.photo_id , recipes.videos_id , recipes.category_id , recipes.created_on , recipes.updated_on , users.name AS users_name,users.email AS users_email, category.name AS category_name, COUNT(commentrecipes.recipes_id) AS ValueFrequency from recipes  inner join users on users.id = recipes.users_id  inner join category on category.id = recipes.category_id  inner join commentrecipes on commentrecipes.recipes_id = recipes.id  group by  recipes.id , recipes.name , recipes.users_id , recipes.description ,recipes.photo_id , recipes.videos_id , recipes.category_id , recipes.created_on , recipes.updated_on , users.name , users.email, category.name   ${querysearch}  `)
    // return Pool.query(`select product.id,product.name,product.brand,product.price,product.stock,product.photo,product.color,product.size,product.description,product.status,product.category_id,product.seller_id,product.created_on,product.updated_on,seller.users_id,seller.name_store,seller.logo,seller.address,seller.description,seller.phone from product inner join seller on seller.id = product.seller_id ${querysearch} order by product.${sortby} ${sort} limit ${limit} offset ${offset} `)
}


module.exports = {
    selectAll,
    selectAllSearch,
    selectPagination,
    selectRecipes,
    insertRecipes,
    updateRecipes,
    updateRecipesNoPhoto,
    deleteRecipes,
    selectCategory,
    selectUsers,
    countData,
    selectPaginationUserRecipes,
    deleteRecipesSelected,
    selectPaginationCategory,
    selectPaginationSavedRecipes,
    selectAllSavedRecipes,
    selectPaginationLikesRecipes,
    selectAllLikesRecipes,
    selectPaginationCommentRecipes,
    selectAllCommentRecipes
}