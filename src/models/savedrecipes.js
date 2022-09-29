const Pool = require('../config/db')
const selectAll = () => {
    return Pool.query(`select * from savedrecipes`);
}

const selectAllSearch = (querysearch) => {
    return Pool.query(`select * from savedrecipes  ${querysearch} `);
}

const selectPagination = ({ limit, offset, sortby, sort, querysearch }) => {
    return Pool.query(`select * from savedrecipes  ${querysearch}  order by ${sortby} ${sort} limit ${limit} offset ${offset} `)
}
const selectSavedRecipes = (id) => {
    return Pool.query(`select * from savedrecipes where id='${id}'`);
}

const selectRecipes = (recipes_id) => {
    return Pool.query(`select * from recipes where id='${recipes_id}'`)
}

const selectUsers = (users_id) => {
    return Pool.query(`select * from users where id='${users_id}'`)
}

const insertSavedRecipes = (
    id,
    recipes_id,
    users_id
) => {
    return Pool.query(`insert into savedrecipes ( id, recipes_id,  users_id ) values ('${id}', '${recipes_id}', '${users_id}'  )`)
}

const updateSavedRecipes = (
    id, recipes_id, users_id
) => {
    return Pool.query(`update savedrecipes set recipes_id = '${recipes_id}' , users_id = '${users_id}' WHERE id = '${id}'`)
}

const deleteSavedRecipes = (id) => {
    return Pool.query(`delete from savedrecipes where id='${id}'`)
}

const countData = () => {
    return Pool.query("SELECT COUNT(*) FROM savedrecipes");
};

const selectPaginationByUser = ({ limit, offset, sortby, sort, querysearch }) => {
    return Pool.query(`select savedrecipes.id, savedrecipes.recipes_id , savedrecipes.users_id , savedrecipes.created_on , recipes.id as recipes_id , recipes.name as recipes_name , recipes.users_id as recipes_users_id , recipes.description as recipes_description , recipes.photo_id as recipes_photo_id , recipes.videos_id as recipes_videos_id , recipes.category_id as recipes_category_id , recipes.created_on as recipes_created_on , recipes.updated_on as recipes_update_on from savedrecipes   ${querysearch}  order by ${sortby} ${sort} limit ${limit} offset ${offset} `)
}

module.exports = {
    selectAll,
    selectAllSearch,
    selectPagination,
    selectSavedRecipes,
    selectUsers,
    selectRecipes,
    insertSavedRecipes,
    updateSavedRecipes,
    deleteSavedRecipes,
    countData,
    selectPaginationByUser
}


