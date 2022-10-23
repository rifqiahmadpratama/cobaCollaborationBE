const Pool = require('../config/db')
const selectAll = () => {
    return Pool.query(`select * from likesrecipes`);
}

const selectAllSearch = (querysearch) => {
    return Pool.query(`select * from likesrecipes  ${querysearch} `);
}

const selectPagination = ({ limit, offset, sortby, sort, querysearch }) => {
    return Pool.query(`select * from likesrecipes  ${querysearch}  order by ${sortby} ${sort} limit ${limit} offset ${offset} `)
}
const selectLikesRecipes = (id) => {
    return Pool.query(`select * from likesrecipes where id='${id}'`);
}

const selectRecipes = (recipes_id) => {
    return Pool.query(`select * from recipes where id='${recipes_id}'`)
}

const selectUsers = (users_id) => {
    return Pool.query(`select * from users where id='${users_id}'`)
}

const insertLikesRecipes = (
    id,
    recipes_id,
    users_id
) => {
    return Pool.query(`insert into likesrecipes ( id, recipes_id,  users_id ) values ('${id}', '${recipes_id}', '${users_id}'  )`)
}

const updateLikesRecipes = (
    id, recipes_id, users_id
) => {
    return Pool.query(`update likesrecipes set recipes_id = '${recipes_id}' , users_id = '${users_id}' WHERE id = '${id}'`)
}

const deleteLikesRecipes = (id) => {
    return Pool.query(`delete from likesrecipes where id='${id}'`)
}

const countData = () => {
    return Pool.query("SELECT COUNT(*) FROM likesrecipes");
};

const selectPaginationByUser = ({ limit, offset, sortby, sort, querysearch }) => {
    return Pool.query(`select likesrecipes.id, likesrecipes.recipes_id , likesrecipes.users_id , likesrecipes.created_on , recipes.id as recipes_id , recipes.name as recipes_name , recipes.users_id as recipes_users_id , recipes.description as recipes_description , recipes.photo_id as recipes_photo_id , recipes.videos_id as recipes_videos_id , recipes.category_id as recipes_category_id , recipes.created_on as recipes_created_on , recipes.updated_on as recipes_update_on from likesrecipes   ${querysearch}  order by ${sortby} ${sort} limit ${limit} offset ${offset} `)
}

module.exports = {
    selectAll,
    selectAllSearch,
    selectPagination,
    selectLikesRecipes,
    selectUsers,
    selectRecipes,
    insertLikesRecipes,
    updateLikesRecipes,
    deleteLikesRecipes,
    countData,
    selectPaginationByUser,
}